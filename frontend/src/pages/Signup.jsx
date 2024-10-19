import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signup() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg text-center px-4 p-2">
          <Heading title={"Sign up"} />
          <SubHeading
            description={"Enter your information to create an account"}
          />
          <InputBox label={"First Name"} placeholder={"Tony"} />
          <InputBox label={"Last Name"} placeholder={"Stark"} />
          <InputBox label={"Email"} placeholder={"tonystark@gmail.com"} />
          <InputBox label={"Password"} placeholder={"password"} />
          <div className="pt-4">
            <Button label={"Sign up"} />
          </div>
          <BottomWarning
            description={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}
