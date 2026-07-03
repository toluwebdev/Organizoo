import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

import { useAppContext } from "../../context/AppContext";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Editprofile = () => {
  const { userData, mode } = useAppContext();
  const navigate = useNavigate();

  let [image, setImage] = useState(false);
  let [userName, setUserName] = useState(userData?.name || "");
  let [email, setEmail] = useState(userData?.email || "");
  let [about, setAbout] = useState(userData?.about || "");
  let [socialLinks, setSocialLinks] = useState(
    userData?.socialLinks || { twitter: "", facebook: "", instagram: "" }
  );
  useEffect(() => {
    if (!email) navigate("/");
  }, []);
  return (
    <div className={`p-3 pb-6`}>
      <form
        className={`max-w-4xl ${
          mode ? "border border-gray-500/30" : ""
        }  rounded-md mt-6 shadow-2xl p-3 mx-auto `}
      >
        <h1
          className={`text-center transition-all duration-700 text-2xl font-800 mt-3 ${
            mode ? "text-white" : "text-black"
          }`}
        >
          Edit Profile
        </h1>
        <div className="w-25 flex justify-center items-center mx-auto mt-3">
          <label htmlFor="image" className="relative   cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : userData.imageUrl
                  ? userData.imageUrl
                  : assets.uploadArea
              }
              loading="lazy"
              className="size-25  rounded-full object-cover object-center "
              alt="profile image"
            />
            <input
              type="file"
              id="image"
              hidden
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div
              className={`absolute shadow-8xl duration-700  bottom-0 right-2  size-6 flex justify-center items-center rounded-full
                ${mode ? "bg-white" : "bg-black/20"}`}
            >
              <MdEdit />
            </div>
          </label>
        </div>
        {image ? (
          <div className="flex my-2 justify-center items-center">
            <button
              className="px-3 bg-[#0B8F76]  py-2 text-white rounded-md"
              onClick={() => setImage(false)}
            >
              Delete Profile
            </button>
          </div>
        ) : (
          ""
        )}
        <div className=" flex mt-5 gap-3  flex-col">
          {/* Email  & UserName*/}
          <div className="flex max-md:flex-col gap-3">
            <div className="flex-1">
              <label
                htmlFor="name"
                className={`${mode ? "text-white" : "text-black"} duration-700`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                required
                className={`p-2 w-full block border rounded-sm duration-700 border-[#BEC4D5] ${
                  mode ? "text-white" : "text-black"
                } outline-0`}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label
                className={`${mode ? "text-white" : "text-black"} duration-700`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onClick={() => toast.error("Can't Edit Email")}
                className={`p-2 w-full block border rounded-sm duration-700 border-[#BEC4D5] ${
                  mode ? "text-white" : "text-black"
                } outline-0`}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* Bio  */}
          <div className="flex-1">
            <label
              htmlFor="bio"
              className={`${mode ? "text-white" : "text-black"} duration-700`}
            >
              Bio
            </label>

            <textarea
              id="bio"
              placeholder="Write a bio"
              className={`p-2 w-full block border rounded-sm duration-700 border-[#BEC4D5] ${
                mode ? "text-white" : "text-black"
              } outline-0`}
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              rows={5}
              required
            ></textarea>
          </div>
          {/* Social Links */}
          <h1 className={`${mode ? "text-white" : "text-black"} mt-2 text-2xl`}>
            Social Links
          </h1>
          <hr className={` text-[#BEC4D5]  `} />
          <div className="flex max-md:flex-col gap-3">
            <div className="flex-1">
              <label
                htmlFor="facebook"
                className={`${mode ? "text-white" : "text-black"} duration-700`}
              >
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                placeholder="https://....facebook.com"
                value={socialLinks.facebook}
                required
                className={`p-2 w-full block border rounded-sm duration-700 border-[#BEC4D5] ${
                  mode ? "text-white" : "text-black"
                } outline-0`}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, facebook: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label
                className={`${mode ? "text-white" : "text-black"} duration-700`}
                htmlFor="instagram"
              >
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                placeholder="https://...instagram.com"
                value={socialLinks.instagram}
                className={`p-2 w-full block border rounded-sm duration-700 border-[#BEC4D5] ${
                  mode ? "text-white" : "text-black"
                } outline-0`}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, instagram: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label
                className={`${mode ? "text-white" : "text-black"} duration-700`}
                htmlFor="twitter"
              >
                Twitter
              </label>
              <input
                type="text"
                id="twitter"
                placeholder="https://...twitter.com"
                value={socialLinks.twitter}
                className={`p-2 w-full block border rounded-sm duration-700 border-[#BEC4D5] ${
                  mode ? "text-white" : "text-black"
                } outline-0`}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, twitter: e.target.value })
                }
              />
            </div>
          </div>
          {/* Interest */}
          <label htmlFor="interest" className="text-2xl">
            Interest
          </label>
          <hr className={` text-[#BEC4D5]  `} />
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                id="interest"
                placeholder="Add Interest"
                value={""}
                className={`p-2 w-full block border rounded-sm duration-700 border-[#BEC4D5] ${
                  mode ? "text-white" : "text-black"
                } outline-0`}
              />
            </div>
            <button className="px-3 bg-[#0B8F76] text-white rounded-md">
              Add Interest
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="px-3 bg-[#0B8F76]  py-2 text-white rounded-md"
            >
              Save Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Editprofile;
