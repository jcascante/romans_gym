import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme';

const { width } = Dimensions.get('window');

// Theme toggle button component
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
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
  );
};

export default function LandingPage() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleGetStarted = () => {
    navigation.navigate('Main' as never);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header with logo and theme toggle */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.headerLogo}
            resizeMode="cover"
          />
          <Text style={[styles.headerTitle, { color: colors.primary }]}>GymApp</Text>
        </View>
        <ThemeToggleButton />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.heroBackground}
            resizeMode="cover"
          />
          <View style={[styles.heroOverlay, { backgroundColor: colors.primary }]}>
            <Text style={styles.heroTitle}>Ready to get strong with GymApp?</Text>
            <Text style={styles.heroSubtitle}>
              Achieve your fitness goals with comprehensive training, expert guidance, and fully customizable programming templates.
            </Text>
            <TouchableOpacity style={[styles.ctaButton, { backgroundColor: colors.secondary }]} onPress={handleGetStarted}>
              <Text style={[styles.ctaButtonText, { color: colors.primary }]}>View Templates</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={[styles.featuresSection, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Why Choose GymApp?</Text>
          <View style={styles.featuresGrid}>
            <View style={[styles.featureCard, { backgroundColor: theme.colors.card }]}>
              <Ionicons name="fitness" size={40} color={colors.primary} />
              <Text style={[styles.featureTitle, { color: colors.primary }]}>AI-Powered Coaching</Text>
              <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
                Our AI coaches help you reach your goals safely and efficiently with personalized guidance and smart recommendations.
              </Text>
            </View>
            <View style={[styles.featureCard, { backgroundColor: theme.colors.card }]}>
              <Ionicons name="barbell" size={40} color={colors.primary} />
              <Text style={[styles.featureTitle, { color: colors.primary }]}>Smart Training</Text>
              <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
                Intelligent workout tracking and progress analysis for all training styles and levels, ensuring optimal results.
              </Text>
            </View>
            <View style={[styles.featureCard, { backgroundColor: theme.colors.card }]}>
              <Ionicons name="document-text" size={40} color={colors.primary} />
              <Text style={[styles.featureTitle, { color: colors.primary }]}>Adaptive Programs</Text>
              <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
                AI-generated and customizable programming templates that adapt to your progress and unique fitness needs.
              </Text>
            </View>
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={[styles.testimonialsSection, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>What Our Members Say</Text>
          <View style={styles.testimonialsGrid}>
            {[
              {
                quote: "GymApp has completely changed my fitness journey. The comprehensive templates are a game changer!",
                name: 'Alex P.',
              },
              {
                quote: "The trainers are knowledgeable and the equipment is top-notch. Highly recommend!",
                name: 'Maria S.',
              },
              {
                quote: "I love being able to tailor my workouts. The app is so easy to use!",
                name: 'Chris D.',
              },
            ].map((testimonial, index) => (
              <View key={index} style={[styles.testimonialCard, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.quoteMark, { color: theme.colors.text }]}>"</Text>
                <Text style={[styles.testimonialQuote, { color: theme.colors.text }]}>{testimonial.quote}</Text>
                <Text style={[styles.testimonialName, { color: colors.primary }]}>{testimonial.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View style={[styles.contactSection, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.contactTitle, { color: theme.colors.text }]}>Contact Us</Text>
          <Text style={[styles.contactInfo, { color: theme.colors.textSecondary }]}>123 Fitness Ave, City, Country</Text>
          <Text style={[styles.contactInfo, { color: theme.colors.textSecondary }]}>Phone: (123) 456-7890</Text>
          <Text style={[styles.contactInfo, { color: theme.colors.textSecondary }]}>Email: info@gymapp.com</Text>
          <Text style={[styles.copyright, { color: theme.colors.textSecondary }]}>
            © {new Date().getFullYear()} GymApp. All rights reserved.
          </Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 400,
    position: 'relative',
  },
  heroBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  testimonialsSection: {
    padding: 20,
  },
  testimonialsGrid: {
    gap: 16,
  },
  testimonialCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  quoteMark: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testimonialQuote: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: 24,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactSection: {
    padding: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  copyright: {
    fontSize: 14,
    marginTop: 16,
  },
}); 