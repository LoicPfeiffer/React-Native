import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Search from "../Components/Search";

const SearchStackNavigator = createStackNavigator({
  // le nom Search dans le StackNavigator n'est pas forcément identique au nom du composant
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher",
    },
  },
});

export default createAppContainer(SearchStackNavigator);
