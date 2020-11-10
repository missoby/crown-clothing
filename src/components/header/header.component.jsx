import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./header.styles";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartIcon from "../cart-icon/cart-icon.componnent";
import CardDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectHidden } from "../../redux/cart/cart-selector";
import { selectCurrentUser } from "../../redux/user/user-selector";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to="/shop">
        Shop
      </OptionLink>
      <OptionLink to="/shop">
        Contact
      </OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
          <OptionLink to="/signin">
            SIGN IN
          </OptionLink>
        )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CardDropdown />}
  </HeaderContainer>
);

/* const mapStateToProps = state =>({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden
}) */

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectHidden,
});

export default connect(mapStateToProps)(Header);
