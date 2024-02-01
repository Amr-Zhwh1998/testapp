import * as React from "react";
import {
  TextInput,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

function Registration() {
  const MyButton = ({ title, imageSource }) => {
    return (
      <TouchableOpacity style={styles.button}>
        <Image source={imageSource} style={styles.buttonImage} />
        <Text style={styles.ButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const ConfirmButton = ({ title }) => {
    return (
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const [lastName, onChangeLastName] = React.useState("");
  const [firstName, onChangeFirstName] = React.useState("");
  const [phoneNumber, onChangePhoneNumber] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [isMailButtonPressed, setIsMailButtonPressed] = React.useState(false);
  const [isTermsButtonPressed, setIsTermsButtonPressed] = React.useState(false);

  const handleMailButtonPress = () => {
    setIsMailButtonPressed(!isMailButtonPressed);
  };
  const handleTermsButtonPress = () => {
    setIsTermsButtonPressed(!isTermsButtonPressed);
  };
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };
  const ConnectButton = ({ title }) => {
    return (
      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.textConnect}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView keyboardDismissMode="on-drag" style={styles.container}>
      <View>
        <Text numberOfLines={1} style={styles.header}>
          הרשמת משתמשים חדשים
        </Text>
        <MyButton
          title="חשבון פייסבוק"
          imageSource={require("../../../../../assets/Images/FacbookImage.png")}
        />
        <MyButton
          title="חשבון גוגל"
          imageSource={require("../../../../../assets/Images/GoogleImage.png")}
        />
        <View style={styles.firstSeparator} />
        <Text style={styles.secondTitle}>או התחברו באמצעות אימייל וסיסמא</Text>
        <TextInput
          style={styles.textInput}
          value={lastName}
          onChangeText={onChangeLastName}
          placeholder="*שם משפחה..."
        />
        <TextInput
          style={styles.textInput}
          value={firstName}
          onChangeText={onChangeFirstName}
          placeholder="*שם פרטי..."
        />
        <TextInput
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={onChangePhoneNumber}
          placeholder="*טלפון..."
        />

        <View style={styles.genderSection}>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={
                gender === "male"
                  ? styles.selectedGenderInput
                  : styles.genderInput
              }
              onPress={() => handleGenderSelect("male")}
            >
              <Text style={styles.genderButtonText}>ז</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                gender === "female"
                  ? styles.selectedGenderInput
                  : styles.genderInput
              }
              onPress={() => handleGenderSelect("female")}
            >
              <Text style={styles.genderButtonText}>נ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                gender === "other"
                  ? styles.selectedGenderInput
                  : styles.genderInput
              }
              onPress={() => handleGenderSelect("other")}
            >
              <Text style={styles.genderButtonText}>אחר</Text>
            </TouchableOpacity>
            <Text style={styles.genderLabel}>*מין:</Text>
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={onChangeEmail}
          placeholder="*מייל..."
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={onChangePassword}
          placeholder="...בחרו סיסמא*"
          secureTextEntry={true}
        />
        <View style={styles.smallButtonContainer}>
          <Text style={styles.smallButtonText}>אני מאשר.ת קבלת מיילים</Text>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={handleMailButtonPress}
          >
            <Text style={styles.smallButtonLabel}>
              {isMailButtonPressed ? "V" : ""}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.smallButtonContainer}>
          <Text style={styles.smallButtonText}>
            אני מאשר.ת תנאי השימוש והפרטיות
          </Text>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={handleTermsButtonPress}
          >
            <Text style={styles.smallButtonLabel}>
              {isTermsButtonPressed ? "V" : ""}
            </Text>
          </TouchableOpacity>
        </View>
        <ConfirmButton title="אישור" />
      </View>
      <View style={styles.secondBody}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 25,
            padding: 20,
          }}
        >
          כבר משתמשים רשומים?
        </Text>
        <ConnectButton title="להתחברות" />
        <View style={styles.secondSeparator} />
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 30,
            marginTop: 15,
          }}
        >
          צריכים עזרה?
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 15,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          כמה קישורים שיכולו לעזור!
        </Text>
        <Text style={styles.linkText}>שכחתי את הסיסמא</Text>
        <Text style={styles.linkText}>יצירת קשר לקבלת סיוע</Text>
        <Text style={styles.linkText}>שאלות ותשובות נפוצות</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },

  header: {
    flex: 1,
    marginBottom: 10,
    paddingVertical: 25,
    fontSize: 28,
    backgroundColor: "#1a4e74",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    backgroundColor: "#1a4e74",
    marginVertical: 15,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  confirmButton: {
    backgroundColor: "#1a4e74",
    marginVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  ButtonText: {
    color: "white",
    fontSize: 23,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
    marginLeft: 110,
  },
  buttonImage: {
    width: 35,
    height: 35,
    marginRight: 15,
    marginLeft: 60,
  },
  firstSeparator: {
    height: 1,
    backgroundColor: "#3b6b92",
    marginHorizontal: 20,
    marginTop: 20,
  },
  secondTitle: {
    fontSize: 22,
    marginHorizontal: 50,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#4682b4",
    fontWeight: "100",
  },
  connectButton: {
    backgroundColor: "white",
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    color: "#b0bdc3",
    fontSize: 20,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "#dcecf4",
    textAlign: "center",
  },
  forgotPassBtnText: {
    textAlign: "center",
    fontSize: 17,
    color: "#1a4e74",
    marginBottom: 10,
  },

  secondBody: {
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: "#1a4e74",
    marginTop: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },

  textConnect: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    color: "#4682b4",
    fontWeight: "100",
  },
  secondSeparator: {
    height: 1,
    backgroundColor: "#8ebcd4",
    marginHorizontal: 50,
    marginTop: 20,
  },

  linkText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    marginTop: 10,
  },
  genderSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcecf4",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 10,
  },
  genderLabel: {
    fontSize: 20,
    color: "grey",
    marginLeft: 30,
  },
  genderContainer: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 20,
  },
  genderInput: {
    width: 35,
    height: 35,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedGenderInput: {
    width: 35,
    height: 35,
    backgroundColor: "#6097bf",
    marginHorizontal: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  genderButtonText: {
    color: "black",
  },
  smallButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "5%",
    marginVertical: 10,
    marginLeft: 70,
  },
  smallButton: {
    paddingLeft: 1,
    width: 15,
    height: 20,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    marginRight: 20,
  },
  smallButtonText: {
    // Your text styles
    fontSize: 18,
    color: "#4682b4",
    marginRight: 10,
  },
  smallButtonLabel: {
    // Your button label styles
  },
});

export default Registration;
