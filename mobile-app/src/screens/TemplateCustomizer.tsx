import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Template, Exercise, Week, Day } from '../types';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme';

type RouteParams = {
  template: Template;
};

export default function TemplateCustomizer() {
  const navigation = useNavigation();
  const route = useRoute();
  const { template } = route.params as RouteParams;
  const { theme, toggleTheme } = useTheme();
  
  // Use weeks as main state. If template has no weeks, initialize with 1 week, 1 day, and exercises.
  const initialWeeks: Week[] = template.weeks && template.weeks.length > 0
    ? template.weeks
    : [{ week: 1, days: [{ day: 1, exercises: template.exercises || [] }] }];
  const [weeks, setWeeks] = useState<Week[]>(initialWeeks);
  const [templateName, setTemplateName] = useState(template.name);
  const [templateDescription, setTemplateDescription] = useState(template.description);
  
  // Track which weeks are expanded
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set()); // Start with all weeks collapsed

  // Toggle week expansion
  const toggleWeekExpansion = (weekIdx: number) => {
    setExpandedWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekIdx)) {
        newSet.delete(weekIdx);
      } else {
        newSet.add(weekIdx);
      }
      return newSet;
    });
  };

  // Add/remove/edit week, day, exercise logic
  const handleAddWeek = () => {
    const newWeekIdx = weeks.length;
    setWeeks(prev => ([
      ...prev,
      { week: prev.length + 1, days: [{ day: 1, exercises: [] }] }
    ]));
    // Auto-expand the new week
    setExpandedWeeks(prev => new Set([...prev, newWeekIdx]));
  };
  const handleRemoveWeek = (weekIdx: number) => {
    setWeeks(prev => prev.filter((_, i) => i !== weekIdx));
    // Remove from expanded weeks and adjust indices
    setExpandedWeeks(prev => {
      const newSet = new Set<number>();
      prev.forEach(idx => {
        if (idx < weekIdx) {
          newSet.add(idx);
        } else if (idx > weekIdx) {
          newSet.add(idx - 1);
        }
      });
      return newSet;
    });
  };
  const handleAddDay = (weekIdx: number) => {
    setWeeks(prev => prev.map((w, i) =>
      i === weekIdx
        ? { ...w, days: [...w.days, { day: w.days.length + 1, exercises: [] }] }
        : w
    ));
  };
  const handleRemoveDay = (weekIdx: number, dayIdx: number) => {
    setWeeks(prev => prev.map((w, i) =>
      i === weekIdx
        ? { ...w, days: w.days.filter((_, d) => d !== dayIdx) }
        : w
    ));
  };
  const handleAddExercise = (weekIdx: number, dayIdx: number) => {
    setWeeks(prev => prev.map((w, i) =>
      i === weekIdx
        ? { ...w, days: w.days.map((d, j) =>
            j === dayIdx
              ? { ...d, exercises: [...d.exercises, { id: Date.now().toString(), name: '', sets: 3, reps: 8, notes: '' }] }
              : d
          ) }
        : w
    ));
  };
  const handleRemoveExercise = (weekIdx: number, dayIdx: number, exIdx: number) => {
    setWeeks(prev => prev.map((w, i) =>
      i === weekIdx
        ? { ...w, days: w.days.map((d, j) =>
            j === dayIdx
              ? { ...d, exercises: d.exercises.filter((_, e) => e !== exIdx) }
              : d
          ) }
        : w
    ));
  };
  const handleUpdateExercise = (weekIdx: number, dayIdx: number, exIdx: number, field: keyof Exercise, value: string | number) => {
    setWeeks(prev => prev.map((w, i) =>
      i === weekIdx
        ? { ...w, days: w.days.map((d, j) =>
            j === dayIdx
              ? { ...d, exercises: d.exercises.map((ex, k) =>
                  k === exIdx ? { ...ex, [field]: value } : ex
                ) }
              : d
          ) }
        : w
    ));
  };

  const handleSaveTemplate = () => {
    // Save the full structure (weeks)
    Alert.alert(
      'Save Template',
      'Save your customized template?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: () => {
            // Here you would save: { ...template, name: templateName, description: templateDescription, weeks }
            Alert.alert('Success', 'Template saved successfully!');
            navigation.goBack();
          }}
      ]
    );
  };

  // Render helpers
  const renderExercise = (exercise: Exercise, weekIdx: number, dayIdx: number, exIdx: number) => (
    <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: theme.colors.card }]}> 
      <View style={styles.exerciseHeader}>
        <Text style={[styles.exerciseNumber, { color: colors.primary }]}>Exercise {exIdx + 1}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveExercise(weekIdx, dayIdx, exIdx)}>
          <Ionicons name="trash" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.exerciseNameInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
        value={exercise.name}
        onChangeText={value => handleUpdateExercise(weekIdx, dayIdx, exIdx, 'name', value)}
        placeholder="Exercise name"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <View style={styles.exerciseDetails}>
        <View style={styles.detailGroup}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Sets</Text>
          <TextInput
            style={[styles.detailInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
            value={exercise.sets.toString()}
            onChangeText={value => handleUpdateExercise(weekIdx, dayIdx, exIdx, 'sets', parseInt(value) || 0)}
            keyboardType="numeric"
            placeholder="3"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
        <View style={styles.detailGroup}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Reps</Text>
          <TextInput
            style={[styles.detailInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
            value={exercise.reps.toString()}
            onChangeText={value => handleUpdateExercise(weekIdx, dayIdx, exIdx, 'reps', parseInt(value) || 0)}
            keyboardType="numeric"
            placeholder="8"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
      </View>
      <TextInput
        style={[styles.notesInput, { backgroundColor: theme.colors.background, color: theme.colors.textSecondary, borderColor: theme.colors.border }]}
        value={exercise.notes}
        onChangeText={value => handleUpdateExercise(weekIdx, dayIdx, exIdx, 'notes', value)}
        placeholder="Notes (optional)"
        placeholderTextColor={theme.colors.textSecondary}
        multiline
        numberOfLines={2}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}> 
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Customize Template</Text>
        <TouchableOpacity style={styles.headerButton} onPress={toggleTheme}>
          <Ionicons name={theme.isDark ? "sunny" : "moon"} size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Template Info */}
        <View style={[styles.templateInfo, { backgroundColor: theme.colors.card }]}> 
          <TextInput
            style={[styles.templateNameInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
            value={templateName}
            onChangeText={setTemplateName}
            placeholder="Template name"
            placeholderTextColor={theme.colors.textSecondary}
          />
          <TextInput
            style={[styles.templateDescriptionInput, { backgroundColor: theme.colors.background, color: theme.colors.textSecondary, borderColor: theme.colors.border }]}
            value={templateDescription}
            onChangeText={setTemplateDescription}
            placeholder="Template description"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            numberOfLines={3}
          />
        </View>
        {/* Weeks/Days/Exercises Editor */}
        <View style={styles.exercisesSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Weeks & Days</Text>
            <TouchableOpacity style={[styles.addExerciseButton, { backgroundColor: colors.primary }]} onPress={handleAddWeek}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addExerciseButtonText}>Add Week</Text>
            </TouchableOpacity>
          </View>
          {weeks.map((week, weekIdx) => (
            <View key={week.week} style={[styles.weekCard, { backgroundColor: theme.colors.surface }]}> 
              <TouchableOpacity 
                style={styles.weekHeaderTouchable}
                onPress={() => toggleWeekExpansion(weekIdx)}
                activeOpacity={0.7}
              >
                <View style={styles.weekHeader}>
                  <View style={styles.weekHeaderLeft}>
                    <Ionicons 
                      name={expandedWeeks.has(weekIdx) ? "chevron-down" : "chevron-forward"} 
                      size={20} 
                      color={colors.primary} 
                    />
                    <Text style={[styles.weekTitle, { color: colors.primary }]}>Week {weekIdx + 1}</Text>
                    <Text style={[styles.weekSubtitle, { color: theme.colors.textSecondary }]}>
                      ({week.days.length} day{week.days.length !== 1 ? 's' : ''})
                    </Text>
                  </View>
                  <View style={styles.weekHeaderRight}>
                    <TouchableOpacity 
                      style={styles.removeButton} 
                      onPress={(e) => {
                        e.stopPropagation();
                        handleRemoveWeek(weekIdx);
                      }}
                    >
                      <Ionicons name="trash" size={18} color={theme.colors.error} />
                    </TouchableOpacity>
                    {expandedWeeks.has(weekIdx) && (
                      <TouchableOpacity 
                        style={styles.addExerciseButton} 
                        onPress={(e) => {
                          e.stopPropagation();
                          handleAddDay(weekIdx);
                        }}
                      >
                        <Ionicons name="add" size={16} color="#fff" />
                        <Text style={styles.addExerciseButtonText}>Add Day</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              
              {expandedWeeks.has(weekIdx) && (
                <View style={styles.weekContent}>
                  {week.days.map((day, dayIdx) => (
                    <View key={day.day} style={[styles.dayCard, { backgroundColor: theme.colors.card }]}> 
                      <View style={styles.dayHeader}>
                        <Text style={[styles.dayTitle, { color: theme.colors.text }]}>Day {dayIdx + 1}</Text>
                        <View style={styles.dayHeaderRight}>
                          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveDay(weekIdx, dayIdx)}>
                            <Ionicons name="trash" size={16} color={theme.colors.error} />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addExerciseButton} onPress={() => handleAddExercise(weekIdx, dayIdx)}>
                            <Ionicons name="add" size={14} color="#fff" />
                            <Text style={styles.addExerciseButtonText}>Add Exercise</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {day.exercises.map((exercise, exIdx) => renderExercise(exercise, weekIdx, dayIdx, exIdx))}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Save Button */}
      <View style={[styles.saveButtonContainer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}> 
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSaveTemplate}>
          <Text style={styles.saveButtonText}>Save Template</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  templateInfo: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templateNameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  templateDescriptionInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  exercisesSection: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for save button
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addExerciseButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  exerciseCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 4,
  },
  exerciseNameInput: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailGroup: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: 'center',
  },
  notesInput: {
    fontSize: 14,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  weekCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weekHeaderTouchable: {
    // This style is for the touchable area that expands/collapses the week
    // It's not directly used for the week header content itself, which is handled by weekHeader
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weekHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  weekSubtitle: {
    fontSize: 14,
    marginLeft: 8,
  },
  weekContent: {
    // This style is for the content area that is only shown when expanded
    // It's not directly used for the weekCard itself, which is handled by weekCard
  },
  dayCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 