import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyProgram, ProgramStatus, FilterOptions } from '../types';
import { NavigationProp } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import { usePrograms } from '../context/ProgramsContext';
import { colors } from '../theme';

// Program status options
const PROGRAM_STATUSES: Record<ProgramStatus, ProgramStatus> = {
  'New': 'New',
  'In Progress': 'In Progress',
  'Completed': 'Completed',
  'Cancelled': 'Cancelled'
};

// Status colors for visual indicators
const STATUS_COLORS = {
  [PROGRAM_STATUSES['New']]: '#3b82f6',
  [PROGRAM_STATUSES['In Progress']]: '#10b981',
  [PROGRAM_STATUSES['Completed']]: '#8b5cf6',
  [PROGRAM_STATUSES['Cancelled']]: '#ef4444'
};

// Progress colors based on completion percentage
const getProgressColor = (percentage: number) => {
  if (percentage >= 80) return '#10b981';
  if (percentage >= 60) return '#f59e0b';
  if (percentage >= 40) return '#f97316';
  return '#ef4444';
};

// Mock data for saved programs with enhanced features
const mockMyPrograms: MyProgram[] = [
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
    dateAdded: '2024-01-15',
    lastModified: '2024-01-20',
    status: 'In Progress',
    startDate: '2024-01-20',
    progress: 65,
    isActive: true,
    lastWorkout: '2024-01-25',
    personalRecords: {
      'Bench Press': { weight: 185, date: '2024-01-25' },
      'Pull Ups': { reps: 12, date: '2024-01-25' },
    },
    workoutHistory: [
      {
        id: '1',
        date: '2024-01-25',
        week: 1,
        day: 1,
        exercises: [],
        totalSets: 12,
        totalVolume: 2400,
      }
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
    dateAdded: '2024-01-10',
    lastModified: '2024-01-10',
    status: 'New',
    progress: 0,
    isActive: false,
    personalRecords: {},
    workoutHistory: [],
  },
];

export default function MyProgramsPage() {
  const navigation = useNavigation<NavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const { myPrograms, updateProgram, deleteProgram } = usePrograms();
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ProgramStatus>('New');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    focus: [],
    duration: [],
    gender: [],
    type: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter options
  const focusOptions = ['Upper Body', 'Whole Body', 'Glutes & Abs', 'Chest & Triceps', 'Back & Biceps'];
  const durationOptions = ['5/WEEK', '6/WEEK'];
  const genderOptions = ['MALE', 'FEMALE'];
  const typeOptions = ['Strength', 'Hypertrophy', 'Conditioning', 'Rehab'];

  const handleDeleteProgram = (program: MyProgram) => {
    Alert.alert(
      'Delete Program',
      `Are you sure you want to delete "${program.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteProgram(program.id);
            Alert.alert('Success', 'Program deleted successfully!');
          },
        },
      ]
    );
  };

  const handleEditProgram = (program: MyProgram) => {
    navigation.navigate('TemplateCustomizer', { template: program });
  };

  const handleStartWorkout = (program: MyProgram) => {
    Alert.alert(
      'Start Workout',
      `Start "${program.name}" workout?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start',
          onPress: () => {
            Alert.alert('Workout Started', 'Your workout session has begun!');
          },
        },
      ]
    );
  };

  const handleActivateProgram = (programId: number) => {
    setSelectedProgramId(programId);
    setShowStartDateModal(true);
  };

  const confirmActivateProgram = () => {
    if (!startDate) return;

    // Update the selected program to be active
    const programToUpdate = myPrograms.find(p => p.id === selectedProgramId);
    if (programToUpdate) {
      updateProgram({
        ...programToUpdate,
        isActive: true,
        status: 'In Progress',
        startDate: startDate
      });
    }

    setShowStartDateModal(false);
    setSelectedProgramId(null);
    setStartDate('');
  };

  const handleChangeStatus = (program: MyProgram) => {
    setSelectedProgramId(program.id);
    setSelectedStatus(program.status || 'New');
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    const programToUpdate = myPrograms.find(p => p.id === selectedProgramId);
    if (programToUpdate) {
      updateProgram({
        ...programToUpdate,
        status: selectedStatus,
        isActive: selectedStatus === 'In Progress'
      });
    }

    setShowStatusModal(false);
    setSelectedProgramId(null);
  };

  // Filter logic
  const filteredPrograms = myPrograms.filter((program) => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFocus = filters.focus.length === 0 || filters.focus.includes(program.focus || '');
    const matchesDuration = filters.duration.length === 0 || filters.duration.includes(program.duration || '');
    const matchesGender = filters.gender.length === 0 || filters.gender.includes(program.gender || '');
    const matchesType = filters.type.length === 0 || filters.type.includes(program.type || '');
    
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

  const renderProgram = ({ item }: { item: MyProgram }) => (
    <View style={[styles.programCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <View style={styles.programHeader}>
        <Text style={[styles.programName, { color: theme.colors.text }]}>{item.name}</Text>
        <View style={styles.programBadges}>
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status || 'New'] }]}>
            <Text style={styles.statusBadgeText}>{item.status}</Text>
          </View>
        </View>
      </View>
      
      <Text style={[styles.programDescription, { color: theme.colors.textSecondary }]}>{item.description}</Text>
      
      <View style={styles.programStats}>
        <View style={styles.statItem}>
          <Ionicons name="fitness" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>{item.exercises.length} exercises</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="calendar" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>
            Added {item.dateAdded ? new Date(item.dateAdded).toLocaleDateString() : 'Unknown'}
          </Text>
        </View>
        {item.startDate && (
          <View style={styles.statItem}>
            <Ionicons name="play" size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>
              Started {new Date(item.startDate).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>Progress</Text>
          <Text style={styles.progressPercentage}>{item.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${item.progress || 0}%`,
                backgroundColor: getProgressColor(item.progress || 0)
              }
            ]} 
          />
        </View>
      </View>

      {/* Personal Records */}
      {item.personalRecords && Object.keys(item.personalRecords).length > 0 && (
        <View style={styles.recordsContainer}>
          <Text style={styles.recordsTitle}>Personal Records</Text>
          {Object.entries(item.personalRecords).map(([exercise, record]) => (
            <View key={exercise} style={styles.recordItem}>
              <Text style={styles.recordExercise}>{exercise}</Text>
              <Text style={styles.recordValue}>
                {record.weight ? `${record.weight} lbs` : `${record.reps} reps`}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.programActions}>
        {item.status === 'New' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.startButton]}
            onPress={() => handleActivateProgram(item.id)}
          >
            <Ionicons name="play" size={16} color="#ffffff" />
            <Text style={[styles.actionButtonText, styles.startButtonText]}>Start</Text>
          </TouchableOpacity>
        )}
        
        {item.status === 'In Progress' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.startButton]}
            onPress={() => handleStartWorkout(item)}
          >
            <Ionicons name="fitness" size={16} color="#ffffff" />
            <Text style={[styles.actionButtonText, styles.startButtonText]}>Workout</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditProgram(item)}
        >
          <Ionicons name="create" size={16} color="#1e40af" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.statusButton]}
          onPress={() => handleChangeStatus(item)}
        >
          <Ionicons name="options" size={16} color="#1e40af" />
          <Text style={styles.actionButtonText}>Status</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteProgram(item)}
        >
          <Ionicons name="trash" size={16} color="#dc2626" />
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="fitness-outline" size={64} color="#cbd5e1" />
      <Text style={styles.emptyStateTitle}>No Programs Yet</Text>
      <Text style={styles.emptyStateDescription}>
        Browse templates and add your favorite programs to get started!
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => navigation.navigate('Main' as never)}
      >
        <Text style={styles.emptyStateButtonText}>Browse Templates</Text>
      </TouchableOpacity>
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
          <Text style={[styles.headerTitle, { color: colors.primary }]}>My Programs</Text>
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
          placeholder="Search programs..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color={colors.primary} />
          {getActiveFiltersCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {filteredPrograms.length > 0 ? (
        <FlatList
          data={filteredPrograms}
          renderItem={renderProgram}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}

      {/* Start Date Modal */}
      <Modal
        visible={showStartDateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStartDateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Start Program</Text>
              <TouchableOpacity onPress={() => setShowStartDateModal(false)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>When do you want to start this program?</Text>
              <TextInput
                style={styles.dateInput}
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#94a3b8"
              />
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setShowStartDateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={confirmActivateProgram}
              >
                <Text style={styles.confirmButtonText}>Start Program</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Status Change Modal */}
      <Modal
        visible={showStatusModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Status</Text>
              <TouchableOpacity onPress={() => setShowStatusModal(false)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>Select new status:</Text>
              {Object.values(PROGRAM_STATUSES).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusOption,
                    selectedStatus === status && styles.statusOptionSelected
                  ]}
                  onPress={() => setSelectedStatus(status)}
                >
                  <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[status] }]} />
                  <Text style={[
                    styles.statusOptionText,
                    selectedStatus === status && styles.statusOptionTextSelected
                  ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setShowStatusModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={confirmStatusChange}
              >
                <Text style={styles.confirmButtonText}>Update Status</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Filter Programs</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              {/* Focus Area Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: theme.colors.text }]}>Focus Area</Text>
                <View style={styles.filterChips}>
                  {focusOptions.map((option) => renderFilterChip('focus', option))}
                </View>
              </View>

              {/* Duration Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: theme.colors.text }]}>Duration</Text>
                <View style={styles.filterChips}>
                  {durationOptions.map((option) => renderFilterChip('duration', option))}
                </View>
              </View>

              {/* Gender Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: theme.colors.text }]}>Gender</Text>
                <View style={styles.filterChips}>
                  {genderOptions.map((option) => renderFilterChip('gender', option))}
                </View>
              </View>

              {/* Type Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: theme.colors.text }]}>Type</Text>
                <View style={styles.filterChips}>
                  {typeOptions.map((option) => renderFilterChip('type', option))}
                </View>
              </View>
            </ScrollView>
            
            <View style={[styles.modalFooter, { borderTopColor: theme.colors.border }]}>
              <TouchableOpacity 
                style={[styles.clearButton, { backgroundColor: theme.colors.borderLight }]} 
                onPress={clearAllFilters}
              >
                <Text style={[styles.clearButtonText, { color: theme.colors.textSecondary }]}>Clear All</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContainer: {
    padding: 16,
  },
  programCard: {
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
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  programName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  programBadges: {
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
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  programDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  programStats: {
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
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  recordsContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  recordsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  recordExercise: {
    fontSize: 12,
    color: '#64748b',
  },
  recordValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  programActions: {
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
  startButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  editButton: {
    backgroundColor: '#ffffff',
    borderColor: '#1e40af',
  },
  statusButton: {
    backgroundColor: '#ffffff',
    borderColor: '#1e40af',
  },
  deleteButton: {
    backgroundColor: '#ffffff',
    borderColor: '#dc2626',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginLeft: 4,
  },
  startButtonText: {
    color: '#ffffff',
  },
  deleteButtonText: {
    color: '#dc2626',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyStateButton: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalBody: {
    padding: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusOptionSelected: {
    backgroundColor: '#f1f5f9',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusOptionText: {
    fontSize: 16,
    color: '#1e293b',
  },
  statusOptionTextSelected: {
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#64748b',
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#1e40af',
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
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
    alignItems: 'center',
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
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
    padding: 8,
    marginLeft: 8,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#1e40af',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterSection: {
    marginBottom: 20,
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
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginRight: 8,
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
}); 