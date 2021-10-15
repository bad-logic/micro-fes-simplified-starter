import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import store, { addToCart } from "../store";
import { useSnapshot } from "valtio";

import { MFE_BORDER } from "../constants";

const Cart = () => {
  const { cart } = useSnapshot(store);
  return (
    <Box border={MFE_BORDER}>
      {cart.map((cartItem) => (
        <Box
          borderBottom="1px"
          borderBottomColor="gray.200"
          mb={3}
          key={[cartItem.producerName, cartItem.beverageName].join("")}
        >
          <Box>
            <Text fontSize="2xl">
              <strong>{cartItem.producerName}</strong>&nbsp;
              {cartItem.beverageName}
            </Text>
          </Box>
          <Box>
            <Text>
              {cartItem.beverageStyle}&nbsp; ({cartItem.quantity})
            </Text>
          </Box>
        </Box>
      ))}
      <Box>
        <Button width="100%" onClick={() => (store.cart = [])}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
