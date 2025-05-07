import React from "react";
import Title from "../components/Title";
import NewsTeller from "../components/NewsTeller";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 ">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.rice_field}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-seminbold text-xl text-gray-600"> Our Store </p>
          <p className="text-gray-500">
            Krishi Pvt. Ltd. <br />
            Boys Residence 1, Silicon University, <br />
            Silicon Hills, Near DLF <br />
            Patia, Bhubaneshwar - 751024, India{" "}
          </p>
          <p className="text-gray-500">
            Ph. No. : (+91) 82490 06415 <br /> Email : contact@krishi.com
          </p>
          <p className="font-seminbold text-xl text-gray-600">
            Careers at Krishi
          </p>
          <p className="text-gray-500">Learn More About Farmers</p>
          <button className="border border-black px-8 py-4 text:sm hover:bg-black  hover:text-white transition-all duration-5000 ">
            Explore Farmers
          </button>
        </div>
      </div>

      <NewsTeller />
    </div>
  );
};

export default Contact;