import { useState } from "react";
import AdmContentBox from "../../components/AdmContentBox";
import ConfigContentBox from "../../components/ConfigContentBox";
import ContentBox from "../../components/ContentBox";
import Footer from "../../components/Footer";
import GameCrudBox from "../../components/GameCrudBox";
import GenreCrudBox from "../../components/GenreCrudBox";
import HomeHeading from "../../components/HomeHeading";
import NavBar from "../../components/NavBar";
import OptionsList from "../../components/OptionsList";
import SecondaryContainer from "../../components/SecondaryContainer";

const Admin = (props: any) => {
  const options = ["Manage games", "Manage genres"];
  const [currentManager, setCurrentManager] = useState<string>(options[0]);

  return (
    <SecondaryContainer light={false}>
      <NavBar
        currentPage={{
          admin: true,
          home: false,
          profiles: false,
          settings: false,
        }}
      ></NavBar>

      <ContentBox>
        <HomeHeading>Manager Settings</HomeHeading>
        <ConfigContentBox>
          <OptionsList
            options={options}
            currentManager={currentManager}
            setCurrentManager={setCurrentManager}
          />
          {currentManager === "Manage games" && (
            <AdmContentBox>
              <GameCrudBox />
            </AdmContentBox>
          )}
          {currentManager === "Manage genres" && (
            <AdmContentBox>
              <GenreCrudBox />
            </AdmContentBox>
          )}
        </ConfigContentBox>
      </ContentBox>
      <Footer />
    </SecondaryContainer>
  );
};

export default Admin;
