import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import PointButton from "./PointButton/PointButton";
import PointerMenu from "./PointerMenu/PointerMenu";
import { useStore } from "@/store/StoreProvider/StoreProvider";
import { useRouter } from "next/router";
import withStore from "@/store/StoreProvider/withStore";

const points = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "5", value: "5" },
  { label: "8", value: "8" },
];

const PointerContainer = styled(Box)(() => {
  return {
    maxWidth: "385px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "5px",
  };
});

const PointerHeader = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };
});

const PointsContainer = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "row",
    padding: "5px 5px",
    border: '1px solid grey',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    borderRadius: "5px",
    justifyContent: "space-between",
    flexWrap: 'wrap',
  };
});

const ButtonContainer = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: '10px'
  }
})

const ActionButton = styled(Button)(() => {
  return {
    height: '25px'
  }
})

function Pointer() {

  const [selected, setSelected] = React.useState('');

  const router = useRouter();
  const isFloating = router.asPath === '/floatingpointer';

  const store = useStore();
  const { showVotes, clearVotes, setVote } =  store.mainStore.getStore();

  const handlePointClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const points = (event.target as HTMLButtonElement).value;
    setSelected(points);
    setVote(points);
  };

  const handleClearVotes = () => {
    setSelected('');
    clearVotes();
  }

  return (
    <PointerContainer>
      <PointerHeader>
        <Typography variant="body1">Select story worth</Typography>
        <PointerMenu />
      </PointerHeader>
      <PointsContainer>
        {points.map((point, index) => {
          return <PointButton 
                      key={index} 
                      value={point.value}
                      onClick={handlePointClick}
                      color={selected === point.value && isFloating ? 'success' : 'primary'}
                      >
                        {point.label}
                      </PointButton>;
        })}
      </PointsContainer>
      <ButtonContainer>
          <ActionButton variant="contained" size="small" color="success" onClick={showVotes}>
            Show Votes
          </ActionButton>
          <ActionButton variant="outlined" size="small" onClick={handleClearVotes}>
            Clear Votes
          </ActionButton>
      </ButtonContainer>
    </PointerContainer>
  );
}

export default withStore(Pointer);