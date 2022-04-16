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
import { useParams } from "react-router-dom";
import { API } from "../Variables";

function EditCity() {
  const toast = useToast();
  const { id } = useParams();
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
    axios
      .get(`${API}/cities/${id}`)
      .then((res) => {
        setData(res.data);
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
      .patch(`${API}/cities/${id}`, data)
      .then((res) => {
        toast({
          title: "City Updated!!!",
          position: "top",
          status: "success",
          duration: 1000,
          isClosable: true,
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
        Edit City
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

export default EditCity;
