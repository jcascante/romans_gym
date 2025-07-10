import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sampleTemplates } from '../../App';
import { Template, FilterOptions } from '../types';
import { NavigationProp } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import { usePrograms } from '../context/ProgramsContext';
import { colors } from '../theme';
import MediaModal from '../components/MediaModal';

// Image constants for consistent handling
const benchPressImg = require('../../assets/bench_press_example.jpg');
const placeholderImg = 'https://via.placeholder.com/150x100?text=Exercise';
const defaultExerciseIcon = 'https://via.placeholder.com/40x40?text=Ex';

// Enhanced sample templates with detailed week/day structure and media
const enhancedTemplates: Template[] = [
  {
    id: 1,
    name: 'Superman Workout',
    category: 'Strength',
    focus: 'Upper Body',
    duration: '5/WEEK',
    gender: 'MALE',
    type: 'Strength',
    description: 'A superhero-inspired upper body program.',
    exercises: [
      { id: '1', name: 'Bench Press', sets: 4, reps: 8, notes: 'Focus on form, full range of motion.' },
      { id: '2', name: 'Pull Ups', sets: 4, reps: 10, notes: 'Use full extension.' },
      { id: '3', name: 'Overhead Press', sets: 3, reps: 10, notes: '' },
    ],
    weeks: [
      {
        week: 1,
        days: [
          { 
            day: 1, 
            exercises: [
              { 
                id: '1', 
                name: 'Bench Press', 
                sets: 4, 
                reps: 8, 
                notes: 'Focus on form, full range of motion.',
                image: require('../../assets/bench_press_example.jpg'),
                video: ''
              },
              { 
                id: '2', 
                name: 'Pull Ups', 
                sets: 4, 
                reps: 10, 
                notes: 'Use full extension.',
                image: 'https://via.placeholder.com/150x100?text=Pull+Ups',
                video: ''
              },
              { 
                id: '3', 
                name: 'Overhead Press', 
                sets: 3, 
                reps: 10, 
                notes: '',
                image: 'https://via.placeholder.com/150x100?text=Overhead+Press',
                video: ''
              },
            ] 
          },
          { 
            day: 2, 
            exercises: [
              { 
                id: '4', 
                name: 'Incline Dumbbell Press', 
                sets: 4, 
                reps: 8, 
                notes: '',
                image: 'https://via.placeholder.com/150x100?text=Incline+Dumbbell+Press',
                video: ''
              },
              { 
                id: '5', 
                name: 'Barbell Row', 
                sets: 4, 
                reps: 10, 
                notes: 'Keep back flat.',
                image: 'https://via.placeholder.com/150x100?text=Barbell+Row',
                video: ''
              },
            ] 
          },
          { 
            day: 3, 
            exercises: [
              { 
                id: '6', 
                name: 'Dips', 
                sets: 3, 
                reps: 12, 
                notes: '',
                image: 'https://via.placeholder.com/150x100?text=Dips',
                video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
              },
              { 
                id: '7', 
                name: 'Face Pulls', 
                sets: 3, 
                reps: 15, 
                notes: 'Pause at contraction.',
                image: 'https://via.placeholder.com/150x100?text=Face+Pulls',
                video: ''
              },
            ] 
          },
        ]
      },
      {
        week: 2,
        days: [
          { 
            day: 1, 
            exercises: [
              { id: '8', name: 'Bench Press', sets: 5, reps: 6, notes: '' },
              { id: '9', name: 'Chin Ups', sets: 4, reps: 8, notes: '' },
              { id: '10', name: 'Lateral Raises', sets: 3, reps: 15, notes: 'Light weight, high reps.' },
            ] 
          },
          { 
            day: 2, 
            exercises: [
              { id: '11', name: 'Incline Barbell Press', sets: 4, reps: 8, notes: '' },
              { id: '12', name: 'Seated Cable Row', sets: 4, reps: 10, notes: '' },
            ] 
          },
          { 
            day: 3, 
            exercises: [
              { id: '13', name: 'Push Ups', sets: 3, reps: 20, notes: '' },
              { id: '14', name: 'Rear Delt Fly', sets: 3, reps: 15, notes: '' },
            ] 
          },
        ]
      },
      {
        week: 3,
        days: [
          { 
            day: 1, 
            exercises: [
              { id: '15', name: 'Close Grip Bench Press', sets: 4, reps: 8, notes: '' },
              { id: '16', name: 'Lat Pulldown', sets: 4, reps: 10, notes: '' },
              { id: '17', name: 'Arnold Press', sets: 3, reps: 10, notes: '' },
            ] 
          },
          { 
            day: 2, 
            exercises: [
              { id: '18', name: 'Decline Dumbbell Press', sets: 4, reps: 8, notes: '' },
              { id: '19', name: 'T-Bar Row', sets: 4, reps: 10, notes: '' },
            ] 
          },
          { 
            day: 3, 
            exercises: [
              { id: '20', name: 'Diamond Push Ups', sets: 3, reps: 15, notes: '' },
              { id: '21', name: 'Cable Face Pull', sets: 3, reps: 15, notes: '' },
            ] 
          },
        ]
      },
    ],
  },
  {
    id: 2,
    name: 'Thor Workout',
    category: 'Strength',
    focus: 'Upper Body',
    duration: '5/WEEK',
    gender: 'MALE',
    type: 'Strength',
    description: 'Get as strong as Thor!',
    exercises: [
      { id: '1', name: 'Deadlift', sets: 5, reps: 5, notes: 'Focus on form.' },
      { id: '2', name: 'Bench Press', sets: 4, reps: 8, notes: '' },
    ],
    weeks: [
      { 
        week: 1, 
        days: [
          { 
            day: 1, 
            exercises: [
              { id: '1', name: 'Deadlift', sets: 5, reps: 5, notes: 'Focus on form.' },
              { id: '2', name: 'Bench Press', sets: 4, reps: 8, notes: '' },
            ] 
          }
        ] 
      },
    ],
  },
  {
    id: 3,
    name: "Jared Feather's Favorite",
    category: 'Hypertrophy',
    focus: 'Whole Body',
    duration: '6/WEEK',
    gender: 'MALE',
    type: 'Hypertrophy',
    description: "Jared Feather's go-to full body routine.",
    exercises: [
      { id: '1', name: 'Squat', sets: 4, reps: 8, notes: '' },
      { id: '2', name: 'Bench Press', sets: 4, reps: 8, notes: '' },
    ],
    weeks: [
      { 
        week: 1, 
        days: [
          { 
            day: 1, 
            exercises: [
              { id: '1', name: 'Squat', sets: 4, reps: 8, notes: '' },
              { id: '2', name: 'Bench Press', sets: 4, reps: 8, notes: '' },
            ] 
          }
        ] 
      },
    ],
  },
  {
    id: 4,
    name: "Dr. Mike's Favorite",
    category: 'Conditioning',
    focus: 'Whole Body',
    duration: '6/WEEK',
    gender: 'MALE',
    type: 'Conditioning',
    description: "Dr. Mike's favorite full body program.",
    exercises: [
      { id: '1', name: 'Bench Press', sets: 4, reps: 8, notes: '' },
      { id: '2', name: 'Squat', sets: 4, reps: 8, notes: '' },
    ],
    weeks: [
      { 
        week: 1, 
        days: [
          { 
            day: 1, 
            exercises: [
              { id: '1', name: 'Bench Press', sets: 4, reps: 8, notes: '' },
              { id: '2', name: 'Squat', sets: 4, reps: 8, notes: '' },
            ] 
          }
        ] 
      },
    ],
  },
  {
    id: 5,
    name: 'Glutes & Abs Emphasis',
    category: 'Hypertrophy',
    focus: 'Glutes & Abs',
    duration: '6/WEEK',
    gender: 'FEMALE',
    type: 'Hypertrophy',
    description: 'Focus on glutes and abs.',
    exercises: [
      { id: '1', name: 'Hip Thrust', sets: 4, reps: 10, notes: '' },
      { id: '2', name: 'Plank', sets: 3, reps: 60, notes: 'Hold for 60 seconds.' },
    ],
    weeks: [
      { 
        week: 1, 
        days: [
          { 
            day: 1, 
            exercises: [
              { id: '1', name: 'Hip Thrust', sets: 4, reps: 10, notes: '' },
              { id: '2', name: 'Plank', sets: 3, reps: 60, notes: 'Hold for 60 seconds.' },
            ] 
          }
        ] 
      },
    ],
  },
];

const focusOptions = ['Upper Body', 'Whole Body', 'Glutes & Abs', 'Chest & Triceps', 'Back & Biceps'];
const durationOptions = ['5/WEEK', '6/WEEK'];
const genderOptions = ['MALE', 'FEMALE'];
const typeOptions = ['Strength', 'Hypertrophy', 'Conditioning', 'Rehab'];

export default function TemplatesPage() {
  const navigation = useNavigation<NavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const { addProgram } = usePrograms();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    focus: [],
    duration: [],
    gender: [],
    type: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedTemplate, setExpandedTemplate] = useState<number | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(() => {
    // Initialize all weeks as expanded by default
    const initialExpanded = new Set<string>();
    enhancedTemplates.forEach(template => {
      template.weeks?.forEach(week => {
        initialExpanded.add(`${template.id}-${week.week}`);
      });
    });
    return initialExpanded;
  });
  const [mediaModal, setMediaModal] = useState<{
    visible: boolean;
    type: 'image' | 'video';
    src: string;
    alt: string;
  }>({
    visible: false,
    type: 'image',
    src: '',
    alt: '',
  });

  const filteredTemplates = enhancedTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFocus = filters.focus.length === 0 || filters.focus.includes(template.focus || '');
    const matchesDuration = filters.duration.length === 0 || filters.duration.includes(template.duration || '');
    const matchesGender = filters.gender.length === 0 || filters.gender.includes(template.gender || '');
    const matchesType = filters.type.length === 0 || filters.type.includes(template.type || '');
    
    return matchesSearch && matchesFocus && matchesDuration && matchesGender && matchesType;
  });

  const handleFilterToggle = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues,
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      focus: [],
      duration: [],
      gender: [],
      type: [],
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((total, filter) => total + filter.length, 0);
  };

  const handleAddToMyPrograms = (template: Template) => {
    Alert.alert(
      'Add to My Programs',
      `Add "${template.name}" to your programs? You can customize it after adding.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add',
          onPress: () => {
            addProgram(template);
            Alert.alert('Success', 'Template added to My Programs! You can now customize it in the My Programs section.');
          },
        },
      ]
    );
  };

  const handleMediaPress = (type: 'image' | 'video', src: string | any, alt: string) => {
    setMediaModal({
      visible: true,
      type,
      src,
      alt,
    });
  };

  const closeMediaModal = () => {
    setMediaModal({
      visible: false,
      type: 'image',
      src: '',
      alt: '',
    });
  };

  const toggleWeek = (templateId: number, weekNumber: number) => {
    const weekKey = `${templateId}-${weekNumber}`;
    setExpandedWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekKey)) {
        newSet.delete(weekKey);
      } else {
        newSet.add(weekKey);
      }
      return newSet;
    });
  };

  const isWeekExpanded = (templateId: number, weekNumber: number) => {
    const weekKey = `${templateId}-${weekNumber}`;
    return expandedWeeks.has(weekKey);
  };



  const renderFilterChip = (type: keyof FilterOptions, value: string) => {
    const isSelected = filters[type].includes(value);
    return (
      <TouchableOpacity
        key={value}
        style={[
          styles.filterChip, 
          { 
            backgroundColor: isSelected ? colors.primary : theme.colors.borderLight,
            borderColor: theme.colors.border 
          }
        ]}
        onPress={() => handleFilterToggle(type, value)}
      >
        <Text style={[
          styles.filterChipText, 
          { color: isSelected ? colors.secondary : theme.colors.textSecondary }
        ]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTemplate = ({ item }: { item: Template }) => (
    <View style={[styles.templateCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <TouchableOpacity
        style={styles.templateHeaderTouchable}
        onPress={() => setExpandedTemplate(expandedTemplate === item.id ? null : item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.templateHeader}>
          <View style={styles.templateHeaderLeft}>
            <Text style={[styles.templateName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.templateBadges}>
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={styles.badgeText}>{item.category}</Text>
              </View>
              {item.focus && (
                <View style={[styles.badgeSecondary, { backgroundColor: theme.colors.borderLight }]}>
                  <Text style={[styles.badgeTextSecondary, { color: theme.colors.textSecondary }]}>{item.focus}</Text>
                </View>
              )}
            </View>
          </View>
          <Ionicons 
            name={expandedTemplate === item.id ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={theme.colors.textSecondary} 
          />
        </View>
        
        <Text style={[styles.templateDescription, { color: theme.colors.textSecondary }]}>{item.description}</Text>
        
        <View style={styles.templateStats}>
          <View style={styles.statItem}>
            <Ionicons name="fitness" size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>{item.exercises.length} exercises</Text>
          </View>
          {item.duration && (
            <View style={styles.statItem}>
              <Ionicons name="time" size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>{item.duration}</Text>
            </View>
          )}
          {item.gender && (
            <View style={styles.statItem}>
              <Ionicons name="person" size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>{item.gender}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {expandedTemplate === item.id && (
        <View style={styles.expandedContent}>
          <Text style={[styles.exercisesTitle, { color: theme.colors.text }]}>Programming:</Text>
          {item.weeks && item.weeks.length > 0 ? (
            item.weeks.map((week) => {
              const weekExpanded = isWeekExpanded(item.id, week.week);
              return (
                <View key={week.week} style={[styles.weekContainer, { backgroundColor: theme.colors.borderLight }]}>
                  <TouchableOpacity
                    style={styles.weekHeader}
                    onPress={() => toggleWeek(item.id, week.week)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.weekTitle, { color: theme.colors.text }]}>Week {week.week}</Text>
                    <Ionicons 
                      name={weekExpanded ? "chevron-up" : "chevron-down"} 
                      size={16} 
                      color={theme.colors.textSecondary} 
                    />
                  </TouchableOpacity>
                  {weekExpanded && week.days.map((day) => (
                  <View key={day.day} style={[styles.dayContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                    <Text style={[styles.dayTitle, { color: colors.primary }]}>Day {day.day}</Text>
                    {day.exercises.map((exercise, index) => (
                      <View key={exercise.id} style={styles.exerciseItem}>
                        <View style={styles.exerciseHeader}>
                          <Text style={[styles.exerciseName, { color: theme.colors.text }]}>{index + 1}. {exercise.name}</Text>
                          <Text style={[styles.exerciseSets, { color: theme.colors.textSecondary }]}>
                            {exercise.sets} sets × {exercise.reps} reps
                          </Text>
                        </View>
                        {exercise.notes && (
                          <Text style={[styles.exerciseNotes, { color: theme.colors.textSecondary }]}>{exercise.notes}</Text>
                        )}
                        {/* Media Section */}
                        {(exercise.image || exercise.video) && (
                          <View style={styles.mediaSection}>
                            {exercise.video ? (
                              <TouchableOpacity
                                style={styles.mediaContainer}
                                onPress={() => handleMediaPress('video', exercise.video!, exercise.name)}
                              >
                                <View style={styles.videoThumbnail}>
                                  <Ionicons name="play-circle" size={32} color="#ffffff" />
                                </View>
                                <Text style={[styles.mediaLabel, { color: theme.colors.textSecondary }]}>Video</Text>
                              </TouchableOpacity>
                                                         ) : exercise.image ? (
                               <TouchableOpacity
                                 style={styles.mediaContainer}
                                 onPress={() => handleMediaPress('image', exercise.image!, exercise.name)}
                               >
                                 <Image
                                   source={typeof exercise.image === 'string' ? { uri: exercise.image } : exercise.image}
                                   style={styles.exerciseImage}
                                 />
                                 <Text style={[styles.mediaLabel, { color: theme.colors.textSecondary }]}>Image</Text>
                               </TouchableOpacity>
                            ) : null}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            );
            })
          ) : (
            <Text style={[styles.noProgramming, { color: theme.colors.textSecondary }]}>No programming details available.</Text>
          )}
          
          {/* Hide button at the end of expanded content */}
          <TouchableOpacity
            style={[styles.hideButton, { backgroundColor: theme.colors.borderLight }]}
            onPress={() => setExpandedTemplate(null)}
          >
            <Ionicons name="chevron-up" size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.hideButtonText, { color: theme.colors.textSecondary }]}>Hide Details</Text>
          </TouchableOpacity>
        </View>
      )}

            <View style={styles.templateActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => handleAddToMyPrograms(item)}
        >
          <Ionicons name="add" size={16} color="#ffffff" />
          <Text style={[styles.actionButtonText, styles.addButtonText]}>Add to My Programs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header with navigation */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home' as never)}
          >
            <Ionicons name="home" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.headerLogo}
            resizeMode="cover"
          />
          <Text style={[styles.headerTitle, { color: colors.primary }]}>Templates</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.themeToggle, { backgroundColor: theme.colors.borderLight }]}
            onPress={toggleTheme}
          >
            <Ionicons 
              name={theme.isDark ? 'sunny' : 'moon'} 
              size={20} 
              color={theme.colors.text} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search templates..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="filter" size={20} color={colors.primary} />
          {getActiveFiltersCount() > 0 && (
            <View style={[styles.filterBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Focus Area</Text>
                <View style={styles.filterChips}>
                  {focusOptions.map(option => renderFilterChip('focus', option))}
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Duration</Text>
                <View style={styles.filterChips}>
                  {durationOptions.map(option => renderFilterChip('duration', option))}
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Gender</Text>
                <View style={styles.filterChips}>
                  {genderOptions.map(option => renderFilterChip('gender', option))}
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Type</Text>
                <View style={styles.filterChips}>
                  {typeOptions.map(option => renderFilterChip('type', option))}
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton} 
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Templates List */}
      <FlatList
        data={filteredTemplates}
        renderItem={renderTemplate}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Media Modal */}
      <MediaModal
        visible={mediaModal.visible}
        type={mediaModal.type}
        src={mediaModal.src}
        alt={mediaModal.alt}
        onClose={closeMediaModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  homeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  themeToggle: {
    padding: 8,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  filterButton: {
    padding: 4,
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#dc2626',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalBody: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipActive: {
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
  },
  filterChipText: {
    fontSize: 14,
    color: '#64748b',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#64748b',
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#1e40af',
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  templateCard: {
    backgroundColor: '#ffffff',
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
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  templateHeaderLeft: {
    flex: 1,
  },
  templateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  templateBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  badgeSecondary: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTextSecondary: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
  },
  templateDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  templateStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
    marginBottom: 16,
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  exerciseItem: {
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  exerciseDetails: {
    fontSize: 12,
    color: '#64748b',
  },
  exerciseNotes: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  templateActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flex: 1,
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginLeft: 4,
  },
  addButtonText: {
    color: '#ffffff',
  },
  weekContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseSets: {
    fontSize: 12,
    fontWeight: '500',
  },
  noProgramming: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  templateHeaderTouchable: {
    // No specific styles needed, just for the TouchableOpacity wrapper
  },
  hideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  hideButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  mediaSection: {
    marginTop: 8,
  },
  mediaContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    backgroundColor: '#1e40af',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  mediaLabel: {
    fontSize: 12,
    marginTop: 4,
  },
}); 