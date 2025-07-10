import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Template } from './index';

export type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  TemplateCustomizer: { template: Template };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 