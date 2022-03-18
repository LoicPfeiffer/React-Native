import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
class FilmItem extends React.Component {
  render() {
    const film = this.props.film;
    console.log(this.props.film.title);
    return (
      <View>
        <Text>{film.title}</Text>
        <Image
          style={styles.image}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  film_main_container: {
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 15,
    marginBottom: 30,
  },

  film_description: {
    flexDirection: "column",
    marginLeft: 20,
  },
  vote_average: {
    fontWeight: "bold",
    fontSize: 80,
  },
  titreFilm: {
    fontWeight: "bold",
    marginRight: 50,
    fontSize: 20,
    minWidth: 300,
  },
  OverviewFilm: {
    color: "grey",
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 350,
    minHeight: 100,
  },
  Release_date_film: {
    fontSize: 16,
  },
  image: {
    width: 120,
    height: 180,
    flexDirection: "column",
  },
});

export default FilmItem;
