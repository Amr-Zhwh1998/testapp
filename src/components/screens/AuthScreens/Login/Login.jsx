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

function Login() {
  const MyButton = ({ title, imageSource }) => {
    return (
      <TouchableOpacity style={styles.button}>
        <Image source={imageSource} style={styles.buttonImage} />
        <Text style={styles.ButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const ForgotPasswordButton = ({ title }) => {
    return (
      <TouchableOpacity style>
        <Text style={styles.forgotPassBtnText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const SighUpButton = ({ title }) => {
    return (
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.textSignUp}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  return (
    <ScrollView keyboardDismissMode="on-drag" style={styles.container}>
      <View>
        <Text numberOfLines={1} style={styles.header}>
          התחברות משמתשים קיימים
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
        <Text style={styles.text}>או התחברו באמצעות אימייל וסיסמא</Text>
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
          placeholder="*בחרו סיסמא..."
        />
        <MyButton title={"התחברות"} />
        <ForgotPasswordButton title="שכחתי סיסמא" />
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
          אינכם רשומים עדיין?
        </Text>
        <SighUpButton title={"להרשמה"} />
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
    marginHorizontal: 55,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  ButtonText: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
  },
  buttonImage: {
    width: 35,
    height: 35,
    marginRight: 15,
    marginLeft: 20,
  },
  firstSeparator: {
    height: 1,
    backgroundColor: "#3b6b92",
    marginHorizontal: 50,
    marginTop: 20,
  },
  text: {
    fontSize: 22,
    marginHorizontal: 50,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#4682b4",
    fontWeight: "100",
  },
  textInput: {
    color: "#b0bdc3",
    fontSize: 20,
    padding: 10,
    marginHorizontal: 50,
    marginTop: 20,
    borderColor: "grey",
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
  },
  signUpButton: {
    backgroundColor: "white",
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  textSignUp: {
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
});

export default Login;
