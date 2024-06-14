import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";

const CalculatePrice = ({ coursePrice, setPrice }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [member, setMember] = useState({});
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllSybscription = async () => {
      try {
        await axios
          .get("/subscription/getAll-subscription")
          .then((res) => {
            setSubscriptions(res.data.subscription);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getAllSybscription();
  }, []);
  useEffect(() => {
    const getUserMembership = async () => {
      try {
        await axios
          .get("/member/get-member", {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setMember(res.data.member);
            dispatch({
              type: "ADD_MEMBERSHIP",
              payload: res.data.member,
            });
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUserMembership();
  }, [token, dispatch]);
  const normalizeBenefits = (benefits) => {
    return benefits?.map((benefit) => benefit.toLowerCase());
  };

  const calculateDiscount = () => {
    if (subscriptions.length > 0 && member) {
      const subscription = subscriptions?.find(
        (subs) => subs?._id === member?.subscription?.subscriptionId
      );
      if (subscription) {
        const normalizedBenefits = normalizeBenefits(subscription?.benifits);
        const discountedBenefit = normalizedBenefits?.find((benefit) =>
          benefit.includes("% off")
        );
        if (discountedBenefit) {
          const discountMatch = discountedBenefit?.match(/(\d+)% off/);
          if (discountMatch) {
            return parseInt(discountMatch[1], 10); // Correctly parse the discount
          }
        }
      }
    }
    return 0;
  };
  const applyDiscount = (coursePrice) => {
    const discount = calculateDiscount();
    if (coursePrice !== 0) {
      const price = coursePrice - (coursePrice * discount) / 100;
      setPrice(price);
      return price;
    } else {
      setPrice(coursePrice);
      return coursePrice;
    }
  };
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "outfit-semibold",
          fontWeight: "600",
          fontSize: 15,
          color: Colors.WHITE,
        }}
      >
        EnrollCourse(
        {coursePrice === 0 ? "Free" : "₹" + applyDiscount(coursePrice)})
      </Text>
    </View>
  );
};

export default CalculatePrice;
