import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signin() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg text-center px-4 p-2">
          <Heading title={"Sign In"} />
          <SubHeading
            description={"Enter your credentials to access your account"}
          />
          <InputBox label={"Email"} placeholder={"tonystark@gmail.com"} />
          <InputBox label={"Password"} placeholder={"password"} />
          <div className="pt-4">
            <Button label={"Sign in"} />
          </div>
          <BottomWarning
            description={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
