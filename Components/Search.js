// Components/Search.js
import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";
import FilmItem from "./FilmItems";
import films from "../Helpers/filmsData";
import getFilmsFromApiWithSearchedText from "../API/TMDBApi";
import "react-json-pretty/themes/adventure_time.css";
import JSONPretty from "react-json-pretty";

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "red",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.totalPages = 0;
    this.page = 0;
    this.state = { films: [], height: 0 };
    this.searchedText = "";
    // ceci va devenir un state
  }
  _searchFilms() {
    // setState est une fonction asychrone
    // Pour améliorer les performances React peut en différer les traitements
    // Elle prend un deuxième paramètre
    //      une fonction callback qui est appelée lorsque tout est prêt
    this.totalPages = 0;
    this.page = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        console.log(
          "Page : " +
            this.page +
            " / TotalPages : " +
            this.totalPages +
            " / Nombre de films : " +
            this.state.films.length
        );
        this._loadFilms();
      }
    );
  }
  _searchTextInputChanged(text) {
    this.searchedText = text; // Modification du texte recherché à chaque saisie de texte, sans passer par setState
  }
  _loadFilms() {
    if (this.searchedText.length == 0 || this.state.isLoading) return;
    this.setState({ isLoading: true });
    getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
      (data) => {
        /* alert("liste film");*/
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
          // ... syntaxe Javascript ES6 qui permet de recopier
          // et de fusionner les deux tableaux
          // ⟺ films: this.state.films.concat(data.results)
          films: [...this.state.films, ...data.results],
          isLoading: false,
        });
      }
    );
  }
  displayDetailForFilm = (idFilm) => {
    console.log("film.id=" + idFilm);
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  };
  render() {
    return (
      // Ici on rend à l'écran les éléments graphiques de notre component custom Search
      <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        ></TextInput>
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <View>
            {/*<JSONPretty id="json-pretty" data={this.state.films}></JSONPretty>*/}
          </View>
          <FlatList
            onLayout={(e) => {
              this.setState({ height: e.nativeEvent.layout.height });
              console.log(e.nativeEvent.layout.height);
            }}
            data={this.state.films}
            renderItem={({ item }) => (
              <FilmItem
                film={item}
                displayDetailForFilm={this.displayDetailForFilm}
              />
            )}
            style={{
              flexGrow: 1,
              height: this.state.height,
            }}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.page < this.totalPages) {
                // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                this._loadFilms();
              }
            }}
          ></FlatList>
        </View>
      </SafeAreaView>
    );
  }
}

export default Search;
