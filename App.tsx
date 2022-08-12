import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function EmptyScreen() {
  return <Text>Hello, World!</Text>;
}

const EXAMPLES = [
  {
    name: 'Empty1',
    title: 'Empty1',
    component: EmptyScreen,
  },
  {
    name: 'Empty2',
    title: 'Empty2',
    component: EmptyScreen,
  },
  {
    name: 'Empty3',
    title: 'Empty3',
    component: EmptyScreen,
  },
];

function Item({title, onPress}) {
  return <Button onPress={onPress} title={title} />;
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <FlatList
      style={styles.list}
      data={EXAMPLES}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Item
          title={item.title}
          onPress={() => navigation.navigate(item.name)}
        />
      )}
      renderScrollComponent={props => <ScrollView {...props} />}
    />
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'Home'}
            component={HomeScreen}
            options={{headerTitle: 'Reanimated bug repro'}}
          />
          {EXAMPLES.map(({name, title, component}) => (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={{headerTitle: title}}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});
