import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { API } from "../Variables";

function AddCity() {
  const toast = useToast();
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState({
    country: "",
    city: "",
    population: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/countries`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const handleClick = () => {
    axios
      .post(`${API}/cities`, data)
      .then((res) => {
        toast({
          title: "City Added!!!",
          position: "top",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setData({
          country: "",
          city: "",
          population: "",
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
        Add City
      </Heading>
      <Box w="40%" m="auto">
        <FormControl>
          <FormLabel htmlFor="country">Select Country</FormLabel>
          <Select
            id="country"
            onChange={(e) => handleChange(e)}
            placeholder="Select country"
            value={data.country}
          >
            {countries.map((e) => (
              <option key={e.id} value={e.country}>
                {e.country}
              </option>
            ))}
          </Select>
          <FormLabel htmlFor="city">City Name</FormLabel>
          <Input
            value={data.city}
            id="city"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="enter city name"
          />
          <FormLabel htmlFor="population">Population</FormLabel>
          <Input
            value={data.population}
            onChange={(e) => handleChange(e)}
            id="population"
            type="number"
            placeholder="enter population"
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

export default AddCity;
