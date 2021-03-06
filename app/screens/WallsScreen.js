import React from "react";
import { ListView, RefreshControl } from "react-native";
import Loading from "../components/Loading";
import { List, ListItem, Text, Icon, Body, Right } from "native-base";
import withWalls from "../queries/withWalls";

/**
 * Walls screen
 * 
 * List of walls
 */
export class WallsScreen extends React.Component {
  static navigationOptions = {
    title: "Walls"
  };

  state = {
    refreshing: false
  };

  render() {
    if (this.props.data.loading) {
      return <Loading />;
    } else if (this.props.data.error) {
      return <Text>{this.props.data.error.message}</Text>;
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    const data = ds.cloneWithRows(this.props.data.allWalls);

    return (
      <List
        dataSource={data}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        renderRow={item => (
          <ListItem onPress={() => this.onItemPress(item)}>
            <Body>
              <Text>{item.name}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        )}
        renderLeftHiddenRow={() => null}
        renderRightHiddenRow={() => null}
      />
    );
  }

  onItemPress = item => this.props.navigation.navigate("Routes", item);

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.data.refetch();
    this.setState({ refreshing: false });
  };
}

export default withWalls(WallsScreen);
