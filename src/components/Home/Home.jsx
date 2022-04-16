import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../Variables";

function Home() {
  const toast = useToast();
  const Navigate = useNavigate();
  const [cities, setCities] = useState([]);

  const getCities = () => {
    axios
      .get(`${API}/cities`)
      .then((res) => {
        setCities(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCities();
  }, []);

  const handleSort = (e) => {
    const { value } = e.target;
    if (value == "1") {
      let x = cities.sort((a, b) => {
        if (a.country > b.country) return 1;
        return -1;
      });
      setCities([...x]);
    } else if (value == "2") {
      let x = cities.sort((a, b) => {
        if (Number(a.population) > Number(b.population)) return 1;
        return -1;
      });
      setCities([...x]);
    } else {
      let x = cities.sort((a, b) => {
        if (Number(a.population) > Number(b.population)) return -1;
        return 1;
      });
      setCities([...x]);
    }
  };
  const handleEdit = (id) => {
    Navigate(`/edit-city/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/cities/${id}`)
      .then((res) => {
        toast({
          title: "County Deleted!!!",
          position: "top",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        getCities();
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
    console.log("delete", id);
  };

  return (
    <>
      <Box w="70%" m="auto">
        <Box w="30%" m="auto" align="right">
          <Select
            id="sort"
            onChange={(e) => handleSort(e)}
            placeholder="Select Sort"
          >
            <option value="1">filter by country</option>
            <option value="2">population sort by asc </option>
            <option value="3">population sort by desc </option>
          </Select>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Country</Th>
                <Th>City</Th>
                <Th>Population</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cities.map((e) => (
                <Tr key={e.id}>
                  <Td>{e.id}</Td>
                  <Td>{e.country}</Td>
                  <Td>{e.city}</Td>
                  <Td>{e.population}</Td>
                  <Td>
                    <Button
                      onClick={() => handleEdit(e.id)}
                      colorScheme="teal"
                      variant="link"
                    >
                      edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => handleDelete(e.id)}
                      colorScheme="teal"
                      variant="link"
                    >
                      delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Home;
