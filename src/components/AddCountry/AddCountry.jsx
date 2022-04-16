import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { API } from "../Variables";

function AddCountry() {
  const toast = useToast();
  const [data, setData] = useState({
    country: "",
  });
  const handleChange = (e) => {
    const { value } = e.target;
    setData({ country: value });
  };

  const handleClick = () => {
    axios
      .post(`${API}/countries`, data)
      .then((res) => {
        toast({
          title: "Country Added!!!",
          position: "top",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setData({
          country: "",
        });
      })
      .catch((e) => {
        toast({
          title: e.message,
          position: "top",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Heading as="h3" size="lg" mb="5">
        Add Country
      </Heading>
      <Box w="40%" m="auto">
        <FormControl>
          <FormLabel htmlFor="country">Country Name</FormLabel>
          <Input
            value={data.country}
            onChange={(e) => handleChange(e)}
            id="country"
            type="text"
            placeholder="enter country name"
          />
          <Box display="flex" alignItems="right">
            <Button onClick={handleClick} colorScheme="teal" mt="5" size="md">
              Submit
            </Button>
          </Box>
        </FormControl>
      </Box>
    </>
  );
}

export default AddCountry;
