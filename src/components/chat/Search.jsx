import { Box, styled } from "@mui/material";
import React, { useContext } from "react";
import { SearchRounded } from "@mui/icons-material";
import { AccountContext } from "../context/AccountProvider";

const Wrapper = styled(Box)`
  height: 60px;
  padding: 12px 12px 0;
  box-sizing: border-box;
  background-color: #111b21;
  position: relative;
`;

const Input = styled("input")`
  width: 100%;
  background-color: #222e35;
  border: none;
  border-radius: 10px;
  outline: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 15px 10px 30px;
  box-sizing: border-box;
`;

const SearchIcon = styled(SearchRounded)`
  position: absolute;
  left: 22px;
  top: 22px;
  // transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.8);
`;

const Search = () => {
  const { searchText, setSearchText } = useContext(AccountContext);

  return (
    <Wrapper>
      <SearchIcon fontSize="20px" />
      <Input
        type="text"
        placeholder="Search or start a new chat"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
      />
    </Wrapper>
  );
};

export default Search;
