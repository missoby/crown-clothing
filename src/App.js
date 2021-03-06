import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUserAction } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user-selector";

import "./App.css";

class App extends React.Component {
  /* constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }*/

  unsubscribeFromAuth = null;

  componentDidMount() {
    // a lieu d'ecrire à chaque fois this.props.setCurrentUesrState
    const { setCurrentUserState } = this.props;

    // onAuthStateChanged : observateur sur l'objet Auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //snapshop of data venu du createUserProfileDocument et stocker la dans state
        userRef.onSnapshot((snapShot) => {
          /* this.setState({
            currentUser: { */
          setCurrentUserState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        // this.setState({ currentUser: userAuth });
        setCurrentUserState(userAuth);

        /* pour enregistrer les données du shop dans firebase
            addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
        */

      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/*<Header currentUser={this.state.currentUser} />*/}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route zxact path="/checkout" component={CheckoutPage} />
          {/* redirect to home une fois connecté */}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                  <SignInAndSignUpPage />
                )
            }
          />
        </Switch>
      </div>
    );
  }
}

/* fonction qui va faire correspendre des valeur dans l'etat (state) 
   dans notre cas c'est "user" à des propriété (props) du composant. 
   
   As the first argument passed in to connect, mapStateToProps is used 
   for selecting the part of the data from the store that the connected component needs. It’s frequently referred to as just mapState for short.
   It is called every time the store state changes.
   It receives the entire store state, and should return an object of data this component needs.
    const mapStateToProps = ({ user }) => ({
      currentUser: user.currentUser,
    });
*/
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

/* fonction dispatche qui va envoyer l'information a l'action
  user =  currentUser: { id: snapShot.id,...snapShot.data() },*/

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserState: (user) => dispatch(setCurrentUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
