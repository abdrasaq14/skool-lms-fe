interface Data {
  // passport: Buffer;
  name: string;
  degree: string;
  location: string;
  phone: string;
  email: string;
  about: string;
  Qualification: {
    institutionName: string;
    areaOfStudy: string;
    yearOfGraduation: Date;
    grade: number;
    qualificationType: string;
    countryOfInstition: string;
  }[];
  academicReferences: boolean;
  englishProficiency: boolean;
  workExperience: boolean;
  funding: string;
  disablity: string;
  // documents: Buffer;
}

const data: Data = {
  // passport: Buffer.from("src/dummy-data/jonah.JPG"),
  name: "John Doe",
  degree: "Bachelor of Science, Computer Science",
  location: "Cityville, Countryland",
  phone: "+123-456-7890",
  email: "john.doe@example.com",
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  Qualification: [
    {
      institutionName: "University of Example",
      areaOfStudy: "Computer Science",
      yearOfGraduation: new Date("2022-05-30"),
      grade: 3.7,
      qualificationType: "Bachelor",
      countryOfInstition: "Countryland",
    },
    {
      institutionName: "Example College",
      areaOfStudy: "Mathematics",
      yearOfGraduation: new Date("2020-12-15"),
      grade: 3.5,
      qualificationType: "Associate",
      countryOfInstition: "Countryland",
    },
  ],
  academicReferences: true,
  englishProficiency: false,
  workExperience: true,
  funding: "Scholarship",
  disablity: "None",
  // documents: Buffer.from(
  //   "src/dummy-data/Epretari-Jonah-FlowCV-Resume-20240131.pdf"
  // ),
};

export default data;
