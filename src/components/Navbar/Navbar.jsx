import React from "react";
import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Box w="100%" p="3">
        <Flex>
          <Box p="2">
            <Link to="/">
              <Heading size="md">React Test</Heading>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <Link to="/add-country">
              <Button variant="link" colorScheme="teal" mr="4">
                Add Country
              </Button>
            </Link>
            <Link to="/add-city">
              <Button variant="link" colorScheme="teal">
                Add City
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
