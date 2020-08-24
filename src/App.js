import React from "react";
import "./App.css";
import { FilmsPage } from "./pages/films";

const Pages = {
  FILMS: "films",
};

const Menu = ({ activeMenuItem, onMenuItemClick }) => (
  <ul>
    <li
      onClick={() => onMenuItemClick(Pages.FILMS)}
      className={activeMenuItem === Pages.FILMS ? "active-menu-item" : ""}
    >
      Films
    </li>
  </ul>
);
class App extends React.Component {
  state = {
    page: Pages.FILMS,
  };
  render() {
    return (
      <>
        <Menu
          activeMenuItem={this.state.page}
          onMenuItemClick={(page) => this.setState({ page })}
        />
        {this.state.page === Pages.FILMS && <FilmsPage />}
      </>
    );
  }
}

export default App;
