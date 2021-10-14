import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import store, { setSearchText, setAlcoholLimit } from "../store";
import { useSnapshot } from "valtio";
import { MFE_BORDER } from "../constants";

const Search = () => {
  const { searchText, alcoholLimit } = useSnapshot(store);
  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
  };
  const onAlcoholChangeHandler = (value) => {
    setAlcoholLimit(value);
  };
  return (
    <Box border={MFE_BORDER}>
      <FormControl id="search">
        <FormLabel>Search</FormLabel>
        <Input type="text" value={searchText} onChange={onChangeHandler} />
      </FormControl>

      <FormControl id="alcohol">
        <FormLabel>Alcohol</FormLabel>
        <Slider
          colorScheme="pink"
          defaultValue={alcoholLimit}
          value={alcoholLimit}
          min={0}
          max={17}
          onChange={onAlcoholChangeHandler}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
    </Box>
  );
};

export default Search;
