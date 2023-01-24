import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@iconify/react';
import LogoutIcon from "../icons/LogoutIcon"
import SettingsIcon from "../icons/SettingsIcon"
import { getUserDetails } from "../../redux/features/user/userSlice"


import moment from "moment";
import headerStyles from "./styles/headerBar.module.css";

import { logOutUser } from "../../redux/features/auth/authSlice"

const HeaderBar = ({ fieldLength, setFieldLength, open, setOpen, node }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { token, } = auth;

  const [searchQuery, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);


  const btnClicked = () => {
    // console.log(token);
    dispatch(getUserDetails(token));
  }

  useEffect(() => {
    let handler = (e) => {
      if (!node.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);


  const [lightTheme, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme(!lightTheme);
  }


  const togglePopup = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const settingsLinkedClicked = (e) => {
    setOpen(false);
  }


  const logOutBtnClicked = () => {
    console.log('logvnks')
    dispatch(logOutUser({}))
  }


  const day = moment().format("dddd");
  const date = moment().format('DD MMM YYYY');





  //________________________________________________________________________________________________

  return (

    <div className={headerStyles.headerBar}>
      <div className={headerStyles.logoWrapper} >
        <div className={headerStyles.logoDiv}>
          <svg
            className={headerStyles.appLogo}
            width="180" height="180"
            viewBox="16 20 90 90"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_7_23)">
              <rect x="28" y="27" width="67.3922" height="66.5285" rx="19.8101" fill="white" />
            </g>
            <path d="M43.9509 42.4329C43.9509 42.9257 43.961 43.4161 43.9809 43.904C43.985 44.0037 43.9895 44.1033 43.9944 44.2028C44.0227 44.7777 44.0647 45.3489 44.1201 45.9163L44.1253 45.9695C44.184 46.5606 44.2571 47.1475 44.3445 47.7298C44.3524 47.7829 44.3605 47.836 44.3687 47.8891C44.4514 48.4235 44.546 48.954 44.6523 49.4802C44.6751 49.5934 44.6985 49.7063 44.7224 49.8191C44.8221 50.2887 44.9311 50.7549 45.0491 51.2174C45.0906 51.3798 45.1331 51.5416 45.1768 51.7031C45.289 52.1178 45.4085 52.5294 45.5353 52.9379C45.5976 53.1389 45.6617 53.339 45.7275 53.5384C45.8494 53.9077 45.9772 54.2743 46.1108 54.6381C46.1949 54.8674 46.2814 55.0955 46.3702 55.3225C46.5004 55.6556 46.6356 55.9863 46.7756 56.3144C46.8812 56.5621 46.9897 56.8084 47.1008 57.0532C47.2395 57.3588 47.3825 57.6621 47.5296 57.963C47.6551 58.2199 47.7837 58.4751 47.9153 58.7284C48.064 59.0147 48.2164 59.2986 48.3726 59.5803C48.5153 59.8375 48.661 60.0929 48.8099 60.3462C48.9712 60.6206 49.136 60.8926 49.3044 61.1622C49.4602 61.4118 49.6191 61.6593 49.7809 61.9046C49.9586 62.174 50.1399 62.4408 50.3247 62.705C50.4887 62.9394 50.6554 63.1717 50.8249 63.402C51.024 63.6724 51.2268 63.9399 51.4334 64.2045C51.5994 64.4171 51.7678 64.6278 51.9385 64.8365C52.1649 65.1133 52.3955 65.3867 52.6301 65.6564C52.791 65.8415 52.9539 66.0249 53.1186 66.2066C53.3793 66.4942 53.6447 66.7776 53.9147 67.0564C54.0625 67.2092 54.2118 67.3606 54.3623 67.5107C54.6652 67.8126 54.9735 68.109 55.2871 68.3999C55.4129 68.5165 55.5395 68.6323 55.667 68.7472C56.0207 69.0658 56.3808 69.3774 56.7472 69.6818C56.8413 69.76 56.9359 69.8377 57.0309 69.915C57.4446 70.2516 57.8662 70.579 58.2951 70.8969C58.348 70.9361 58.4009 70.9751 58.454 71.014C58.9372 71.368 59.4296 71.71 59.931 72.0397L59.9497 72.052C60.4504 72.3808 60.96 72.6972 61.4779 73.0009C61.5872 73.0649 61.7226 73.0649 61.8319 73.0009C62.3499 72.6972 62.8594 72.3808 63.3601 72.052L63.3789 72.0397C63.8802 71.71 64.3727 71.368 64.8558 71.014C64.9089 70.9751 64.9619 70.9361 65.0147 70.8969C65.4437 70.579 65.8652 70.2515 66.279 69.915C66.3739 69.8377 66.4685 69.76 66.5626 69.6818C66.929 69.3774 67.2891 69.0658 67.6428 68.7472C67.7703 68.6323 67.897 68.5165 68.0228 68.3999C68.3363 68.109 68.6446 67.8126 68.9475 67.5107C69.0981 67.3606 69.2473 67.2092 69.3952 67.0564C69.6651 66.7775 69.9305 66.4942 70.1912 66.2066C70.3559 66.0249 70.5188 65.8415 70.6798 65.6564C70.9143 65.3867 71.1449 65.1133 71.3713 64.8365C71.5421 64.6278 71.7105 64.4171 71.8765 64.2045C72.083 63.9399 72.2858 63.6724 72.4849 63.402C72.559 63.3014 72.6325 63.2004 72.7055 63.0991C72.8453 62.9048 72.7524 62.6319 72.5258 62.5549C72.097 62.4094 71.6744 62.2505 71.2584 62.0787C71.2312 62.0675 71.204 62.0563 71.1769 62.0449C70.647 61.8236 70.128 61.5814 69.6209 61.3194C69.0914 61.0459 68.5749 60.7507 68.0725 60.435C67.5714 60.1202 67.0844 59.7851 66.6126 59.4307C66.4727 59.3257 66.3342 59.2189 66.197 59.1105C65.8705 58.8524 65.5517 58.585 65.241 58.3086C64.9016 58.0065 64.5719 57.6937 64.2525 57.3707C64.0973 57.2137 63.8378 57.2303 63.7043 57.4061C63.4423 57.7512 63.1715 58.0892 62.8922 58.4198L62.8503 58.4693C62.5423 58.8319 62.2241 59.1855 61.896 59.5297C61.763 59.6692 61.7627 59.8896 61.8995 60.0253C61.9388 60.0644 61.9783 60.1033 62.0179 60.1421C62.3174 60.4354 62.6243 60.7212 62.9383 60.9991C63.3815 61.3914 63.8389 61.7681 64.3096 62.1283C64.387 62.1875 64.4647 62.2463 64.5428 62.3046C64.9425 62.603 65.3514 62.8897 65.7692 63.1641C66.1474 63.4126 66.5328 63.6509 66.9251 63.8788C67.1236 63.9942 67.1666 64.2643 67.008 64.4304C66.8071 64.6409 66.6034 64.8487 66.3969 65.0536C66.2767 65.1729 66.1555 65.2913 66.0334 65.4086C65.7124 65.7172 65.385 66.0191 65.0513 66.3142C64.9224 66.4282 64.7926 66.5411 64.6618 66.653C64.297 66.9653 63.9251 67.2694 63.5463 67.5651C63.4323 67.6542 63.3176 67.7425 63.2024 67.83C62.7609 68.1651 62.3104 68.489 61.8514 68.8013C61.7328 68.8819 61.577 68.8819 61.4584 68.8013C60.9994 68.489 60.5489 68.1651 60.1075 67.83C59.9922 67.7425 59.8776 67.6542 59.7635 67.5651C59.3847 67.2694 59.0128 66.9653 58.648 66.653C58.5173 66.5411 58.3874 66.4282 58.2585 66.3142C57.9249 66.0191 57.5974 65.7172 57.2764 65.4086C57.1543 65.2913 57.0332 65.1729 56.913 65.0536C56.5997 64.7428 56.2929 64.4255 55.9927 64.1019C55.8849 63.9858 55.7781 63.8689 55.6721 63.7512C55.3734 63.4195 55.0815 63.0815 54.7968 62.7375C54.7033 62.6245 54.6106 62.5109 54.5186 62.3966C54.2346 62.0436 53.9579 61.6845 53.6889 61.3194C53.6074 61.2089 53.5267 61.0978 53.4466 60.9862C53.1796 60.6139 52.9203 60.2356 52.6692 59.8516C52.597 59.7412 52.5255 59.6304 52.4547 59.5191C52.2075 59.1306 51.9685 58.7365 51.7379 58.3369C51.7259 58.3161 51.714 58.2954 51.702 58.2746C51.6113 58.1166 51.6573 57.9156 51.8086 57.8141C52.2101 57.545 52.6231 57.2919 53.0469 57.0556C53.5616 56.7687 54.0922 56.5066 54.6369 56.2712C54.8706 56.1702 55.1069 56.074 55.3458 55.9829C55.6653 55.861 55.9893 55.7481 56.3174 55.6445C56.8991 55.4608 57.4938 55.3063 58.0998 55.1828C58.3246 55.1369 58.5511 55.0953 58.779 55.0581C59.1849 54.9918 59.5955 54.9393 60.0102 54.9011C60.4047 54.8647 60.803 54.8413 61.2046 54.8313C61.3542 54.8276 61.5044 54.8257 61.6549 54.8257V54.8257C61.8398 54.8257 61.9508 54.6153 61.846 54.463C61.7816 54.3694 61.7179 54.2752 61.6549 54.1805C61.4133 53.8172 61.1826 53.446 60.9633 53.0674C60.8512 52.8739 60.7421 52.6786 60.6361 52.4814C60.4741 52.1803 60.3192 51.8748 60.1716 51.5652C60.1081 51.4321 59.97 51.3502 59.823 51.3628C59.616 51.3805 59.4099 51.4011 59.2047 51.4247C58.8757 51.4625 58.5489 51.5078 58.2246 51.5604C57.7487 51.6377 57.278 51.7308 56.8132 51.8391C56.6938 51.8669 56.5748 51.8958 56.4562 51.9256C55.8776 52.0711 55.3085 52.2404 54.7498 52.4323C54.3177 52.5807 53.8919 52.7427 53.4729 52.9177C53.3482 52.9698 53.224 53.0231 53.1004 53.0775C52.5571 53.3167 52.0258 53.5781 51.5074 53.8604C51.1074 54.0783 50.7151 54.3087 50.3312 54.5511C50.1438 54.6694 49.8934 54.5935 49.8102 54.3881C49.695 54.1037 49.5838 53.8172 49.4766 53.5287C49.4232 53.3849 49.3708 53.2407 49.3194 53.096C49.1715 52.6792 49.032 52.2584 48.9011 51.8338C48.8524 51.6761 48.805 51.5179 48.7588 51.3591C48.6355 50.9359 48.5208 50.509 48.4148 50.0786C48.3735 49.9109 48.3336 49.7427 48.295 49.574C48.1932 49.1298 48.1008 48.682 48.0179 48.2309C47.9881 48.0688 47.9595 47.9063 47.9322 47.7433C47.8457 47.2279 47.7717 46.7083 47.7103 46.1847C47.698 46.08 47.6862 45.975 47.6749 45.8699C47.6153 45.3136 47.5699 44.7529 47.5393 44.1884C47.5316 44.048 47.6089 43.9167 47.7353 43.8552C48.2199 43.6196 48.7114 43.3958 49.2094 43.1843L49.2707 43.1584C49.8494 42.9141 50.4368 42.6864 51.0324 42.4759C51.0324 42.4722 51.038 42.471 51.0463 42.471C51.6195 42.2687 52.2002 42.0823 52.7879 41.9124L52.808 41.9066C53.3755 41.7429 53.9495 41.5946 54.5296 41.4621L54.5925 41.4478C54.5798 41.7746 54.5733 42.103 54.5733 42.4329C54.5733 42.7122 54.5779 42.9904 54.5871 43.2674C54.6071 43.8709 54.6486 44.4689 54.711 45.0607C54.7736 45.6551 54.8573 46.2433 54.9612 46.8245C55.017 47.1367 55.0787 47.4468 55.146 47.7548C55.1794 47.9072 55.2141 48.059 55.2502 48.2103C55.2959 48.4016 55.4906 48.5159 55.6816 48.4687C56.0806 48.3699 56.4835 48.2809 56.8899 48.2017C56.9479 48.1904 57.006 48.1793 57.0641 48.1684C57.5113 48.0847 57.9627 48.0129 58.418 47.9536C58.6324 47.9256 58.7752 47.7164 58.7237 47.5064C58.6155 47.065 58.5212 46.618 58.4411 46.1662C58.3387 45.5889 58.2597 45.0036 58.205 44.4113C58.1449 43.7599 58.1141 43.1 58.1141 42.4329C58.1141 41.9007 58.1337 41.373 58.1721 40.8506C58.2169 40.2427 58.2872 39.6419 58.3821 39.0493C58.4538 38.6012 58.5396 38.1577 58.6388 37.7194C58.6924 37.4829 58.5029 37.2593 58.2615 37.2822C57.904 37.3162 57.5481 37.3555 57.1938 37.4C57.0913 37.4129 56.989 37.4263 56.8868 37.44C56.3867 37.5073 55.8899 37.5851 55.3967 37.673C55.2697 37.6957 55.1429 37.719 55.0164 37.743C54.5488 37.8317 54.0845 37.9296 53.6237 38.0365C53.4641 38.0735 53.3051 38.1115 53.1464 38.1507C52.7205 38.2557 52.2976 38.3685 51.8779 38.4888C51.6781 38.5461 51.4791 38.6051 51.2808 38.6657C50.9052 38.7806 50.5323 38.9016 50.1621 39.0286C49.9149 39.1134 49.6689 39.2009 49.4242 39.2909C49.3701 39.3108 49.3161 39.3309 49.2621 39.351C48.9994 39.4492 48.7381 39.5504 48.4784 39.6546C48.1772 39.7755 47.8781 39.9003 47.581 40.0291L46.8267 40.3668C46.4666 40.533 46.1098 40.7052 45.7564 40.8831C45.568 40.9779 45.3806 41.0744 45.1941 41.1725C44.8356 41.3611 44.4806 41.5557 44.1294 41.7561C44.0214 41.8178 43.9542 41.9321 43.9529 42.0565C43.9516 42.1818 43.9509 42.3073 43.9509 42.4329Z" fill="url(#paint0_linear_7_23)" />
            <path d="M75.4775 58.7658C75.371 58.9709 75.2625 59.1749 75.1521 59.3777C75.075 59.5193 74.9112 59.59 74.7557 59.5474C74.259 59.4114 73.7711 59.2543 73.2929 59.0772C73.2394 59.0574 73.186 59.0373 73.1327 59.017C72.6287 58.8247 72.1357 58.61 71.655 58.3742C71.1231 58.1133 70.6063 57.8265 70.1061 57.5155C69.6019 57.202 69.1146 56.8638 68.6459 56.5027C68.4428 56.3461 68.2431 56.1853 68.0471 56.0203C67.7827 55.7977 67.5249 55.5675 67.274 55.3301C66.823 54.9032 66.3944 54.4528 65.9902 53.9809C65.8464 53.813 65.7057 53.6424 65.5682 53.4692C65.2978 53.1286 65.0396 52.7777 64.7944 52.4173C64.5825 52.1059 64.3802 51.7873 64.1881 51.462C64.0124 51.1647 63.8452 50.8618 63.6868 50.5536C63.5261 50.2409 63.3743 49.9228 63.232 49.5996C63.0234 49.1261 62.835 48.6417 62.6678 48.1475C62.6282 48.0304 62.5897 47.9128 62.5525 47.7946C62.3694 47.2132 62.2155 46.6189 62.0925 46.0134C61.9745 45.4323 61.8849 44.841 61.8253 44.2408C61.7675 43.6584 61.7379 43.0678 61.7379 42.4703C61.7379 41.8728 61.7675 41.2822 61.8253 40.7C61.8848 40.1011 61.974 39.5111 62.0917 38.9313C62.1975 38.4094 62.3264 37.8959 62.4771 37.3918C62.5167 37.259 62.6409 37.1701 62.7795 37.1741V37.1741C63.3164 37.1896 63.8503 37.2171 64.381 37.2562C64.4671 37.2626 64.5532 37.2692 64.6392 37.2762C65.1624 37.3187 65.6824 37.3725 66.199 37.4374C66.3015 37.4503 66.4038 37.4636 66.506 37.4774C67.0061 37.5447 67.5029 37.6224 67.9961 37.7104C68.1231 37.733 68.2499 37.7564 68.3764 37.7804C68.844 37.869 69.3083 37.9669 69.7692 38.0738C69.9287 38.1108 70.0878 38.1489 70.2464 38.188C70.6724 38.2931 71.0952 38.4058 71.5149 38.5262C71.7147 38.5834 71.9137 38.6424 72.112 38.7031C72.4876 38.818 72.8606 38.939 73.2307 39.066C73.478 39.1507 73.7239 39.2382 73.9687 39.3283C74.2861 39.4451 74.6014 39.5664 74.9144 39.692C75.2156 39.8128 75.5148 39.9376 75.8118 40.0664C76.0648 40.1761 76.3162 40.2887 76.5661 40.4041C76.9262 40.5704 77.283 40.7425 77.6364 40.9204C78.1871 41.1977 78.7296 41.4888 79.2634 41.7935C79.3715 41.8551 79.4386 41.9695 79.4399 42.0938C79.4412 42.2192 79.4419 42.3446 79.4419 42.4703C79.4419 42.963 79.4318 43.4535 79.4119 43.9413L79.4118 43.9447C79.4077 44.0433 79.4033 44.1417 79.3984 44.2401C79.3701 44.815 79.3281 45.3863 79.2727 45.9536L79.2675 46.0068C79.2089 46.598 79.1357 47.1849 79.0484 47.7671C79.0404 47.8203 79.0323 47.8734 79.0241 47.9265C78.9414 48.4609 78.8468 48.9913 78.7406 49.5176V49.5176C78.7086 49.676 78.5225 49.7462 78.3919 49.6511C78.2844 49.5728 78.1764 49.4954 78.0679 49.4186C77.7453 49.1907 77.4178 48.9693 77.0855 48.7547C76.6256 48.4576 76.1566 48.1736 75.6789 47.903C75.5484 47.8291 75.4774 47.6818 75.501 47.5337C75.5704 47.0994 75.631 46.6621 75.6826 46.2221C75.6948 46.1173 75.7066 46.0124 75.7179 45.9073C75.7776 45.3509 75.8229 44.7903 75.8536 44.2257C75.8612 44.0853 75.784 43.9541 75.6575 43.8926C75.1729 43.6569 74.6814 43.4331 74.1834 43.2217L74.1221 43.1957C73.5434 42.9514 72.9559 42.7237 72.3603 42.5131C71.7826 42.309 71.1973 42.121 70.6049 41.9497L70.5848 41.9439C70.0173 41.7803 69.4433 41.632 68.8633 41.4995L68.8003 41.4852C68.245 41.3595 67.6842 41.2484 67.1184 41.1522C67.0826 41.1461 67.0468 41.1401 67.011 41.1341C66.5825 41.0627 66.1511 40.9999 65.7171 40.9459C65.5226 40.9217 65.3465 41.0622 65.3299 41.2575C65.296 41.6572 65.2787 42.0617 65.2787 42.4703C65.2787 42.5391 65.2792 42.6079 65.2802 42.6765C65.2889 43.2871 65.3362 43.8883 65.4199 44.4778C65.5091 45.1064 65.6396 45.7218 65.8085 46.3211C65.9679 46.8867 66.1616 47.438 66.3872 47.9726C66.4249 48.0619 66.4635 48.1507 66.5029 48.2391C66.8114 48.93 67.1736 49.5916 67.5843 50.2187C67.6061 50.252 67.628 50.2852 67.6501 50.3183C68.0196 50.8725 68.4272 51.3991 68.8691 51.8945C69.2006 52.2661 69.5514 52.6201 69.9199 52.955C70.0257 53.0512 70.133 53.1457 70.2417 53.2387C70.7038 53.6339 71.1916 53.9998 71.7023 54.3337C72.0957 54.5908 72.5026 54.829 72.9218 55.0467C73.1005 55.1395 73.3188 55.0589 73.3972 54.8736C73.4048 54.8556 73.4124 54.8376 73.4199 54.8196C73.5939 54.4061 73.7594 53.9882 73.9162 53.566C73.9696 53.4223 74.022 53.278 74.0734 53.1333C74.2213 52.7165 74.3609 52.2957 74.4918 51.8712C74.495 51.8607 74.4982 51.8503 74.5014 51.8399C74.5699 51.6169 74.83 51.5161 75.0268 51.6413C75.4175 51.8899 75.8007 52.1492 76.1761 52.4186C76.303 52.5097 76.4289 52.602 76.554 52.6954C76.8688 52.9305 77.1778 53.1729 77.4808 53.4223C77.5927 53.5144 77.6357 53.666 77.5894 53.8033C77.4906 54.0958 77.3882 54.3865 77.2821 54.6755C77.1979 54.9047 77.1114 55.1329 77.0226 55.3599C76.8924 55.693 76.7572 56.0236 76.6173 56.3518C76.5116 56.5995 76.4032 56.8458 76.292 57.0906C76.1533 57.3962 76.0103 57.6995 75.8633 58.0004C75.7377 58.2573 75.6091 58.5124 75.4775 58.7658Z" fill="url(#paint1_linear_7_23)" />
            <path d="M46.0867 80.5126H49.1892V81.6725H46.0867V80.5126ZM46.1972 83.1639H49.7047V84.3607H44.715V77.9165H49.585V79.1133H46.1972V83.1639ZM53.9754 84.4712C53.4783 84.4712 53.0149 84.3914 52.5853 84.2318C52.1618 84.0661 51.7936 83.8329 51.4806 83.5322C51.1676 83.2314 50.9221 82.8785 50.7441 82.4735C50.5722 82.0684 50.4863 81.6234 50.4863 81.1386C50.4863 80.6537 50.5722 80.2088 50.7441 79.8037C50.9221 79.3986 51.1676 79.0457 51.4806 78.745C51.7997 78.4443 52.171 78.2141 52.5945 78.0546C53.018 77.8889 53.4813 77.806 53.9846 77.806C54.5431 77.806 55.0464 77.9042 55.4944 78.1006C55.9486 78.2908 56.3291 78.5732 56.636 78.9475L55.6785 79.8313C55.4576 79.5797 55.2121 79.3925 54.942 79.2698C54.672 79.1409 54.3774 79.0764 54.0583 79.0764C53.7575 79.0764 53.4813 79.1255 53.2297 79.2237C52.9781 79.3219 52.7602 79.4631 52.5761 79.6472C52.392 79.8313 52.2477 80.0492 52.1434 80.3008C52.0452 80.5525 51.9961 80.8317 51.9961 81.1386C51.9961 81.4455 52.0452 81.7247 52.1434 81.9763C52.2477 82.228 52.392 82.4459 52.5761 82.63C52.7602 82.8141 52.9781 82.9553 53.2297 83.0535C53.4813 83.1517 53.7575 83.2008 54.0583 83.2008C54.3774 83.2008 54.672 83.1394 54.942 83.0166C55.2121 82.8877 55.4576 82.6944 55.6785 82.4366L56.636 83.3204C56.3291 83.6948 55.9486 83.9802 55.4944 84.1766C55.0464 84.373 54.54 84.4712 53.9754 84.4712ZM57.6431 84.3607V77.9165H60.4325C61.0094 77.9165 61.5066 78.0116 61.9239 78.2019C62.3413 78.386 62.6635 78.653 62.8905 79.0028C63.1176 79.3526 63.2312 79.77 63.2312 80.2548C63.2312 80.7335 63.1176 81.1478 62.8905 81.4976C62.6635 81.8413 62.3413 82.1052 61.9239 82.2894C61.5066 82.4735 61.0094 82.5655 60.4325 82.5655H58.4716L59.1345 81.9119V84.3607H57.6431ZM61.7398 84.3607L60.1287 82.0224H61.7214L63.3508 84.3607H61.7398ZM59.1345 82.0776L58.4716 81.378H60.3497C60.81 81.378 61.1537 81.2798 61.3808 81.0834C61.6078 80.8808 61.7214 80.6046 61.7214 80.2548C61.7214 79.8988 61.6078 79.6227 61.3808 79.4263C61.1537 79.2299 60.81 79.1317 60.3497 79.1317H58.4716L59.1345 78.4228V82.0776ZM65.9247 84.3607V81.7278L66.2654 82.63L63.4299 77.9165H65.0133L67.186 81.5345H66.2746L68.4564 77.9165H69.9202L67.0847 82.63L67.4161 81.7278V84.3607H65.9247ZM70.4902 84.3607V77.9165H73.2797C73.8566 77.9165 74.3537 78.0116 74.7711 78.2019C75.1884 78.386 75.5106 78.653 75.7377 79.0028C75.9648 79.3526 76.0783 79.77 76.0783 80.2548C76.0783 80.7335 75.9648 81.1478 75.7377 81.4976C75.5106 81.8475 75.1884 82.1175 74.7711 82.3078C74.3537 82.4919 73.8566 82.5839 73.2797 82.5839H71.3188L71.9816 81.9119V84.3607H70.4902ZM71.9816 82.0776L71.3188 81.3687H73.1968C73.6571 81.3687 74.0008 81.2705 74.2279 81.0742C74.455 80.8778 74.5685 80.6046 74.5685 80.2548C74.5685 79.8988 74.455 79.6227 74.2279 79.4263C74.0008 79.2299 73.6571 79.1317 73.1968 79.1317H71.3188L71.9816 78.4228V82.0776ZM78.3071 84.3607V79.1317H76.245V77.9165H81.8607V79.1317H79.7985V84.3607H78.3071Z" fill="black" />
            <defs>
              <filter id="filter0_d_7_23" x="0.265818" y="0.256324" width="122.861" height="121.997" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feMorphology radius="2.97152" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_7_23" />
                <feOffset dy="0.990507" />
                <feGaussianBlur stdDeviation="12.3813" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_23" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_23" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_7_23" x1="43.9509" y1="42.5814" x2="73.13" y2="68.0713" gradientUnits="userSpaceOnUse">
                <stop offset="0.368671" stop-color="#02D5F0" />
                <stop offset="0.88699" stop-color="#0D71FD" />
              </linearGradient>
              <linearGradient id="paint1_linear_7_23" x1="43.9509" y1="42.5814" x2="73.13" y2="68.0713" gradientUnits="userSpaceOnUse">
                <stop offset="0.368671" stop-color="#02D5F0" />
                <stop offset="0.88699" stop-color="#0D71FD" />
              </linearGradient>
            </defs>
          </svg>


        </div>
      </div>
      <div className={headerStyles.dateWrapper}>
        <div className={headerStyles.dayDiv}>
          <p className={headerStyles.dayText}>{day},</p>
        </div>
        <div className={headerStyles.dateDiv}>
          <p className={headerStyles.dateText}>{date}</p>
        </div>
      </div>
      <div className={headerStyles.avatarNameWrapper}>
        <div className={headerStyles.nameContainer}>
          <p className={headerStyles.grettingText}>Hello,</p>
          <p className={headerStyles.nameText}>Andrew</p>
        </div>
        <div className={headerStyles.avatarContainer}>
          <div className={headerStyles.avatarDiv}>
            <div className={headerStyles.avatarImgDiv}
              onClick={btnClicked}
            >
            </div>
          </div>
        </div>
      </div>
      <div className={headerStyles.popUpWrapper} ref={node} >
        <svg
          onClick={() => setOpen((open) => !open)}
          className={headerStyles.popUpIcon}
          width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18.24" cy="18.24" r="18.24" fill="#7E8DA4" />
          <circle cx="84.7205" cy="18.24" r="18.24" fill="#7E8DA4" />
          <circle cx="18.24" cy="84.72" r="18.24" fill="#7E8DA4" fill-opacity="0.42" />
          <circle cx="84.7205" cy="84.72" r="18.24" fill="#7E8DA4" />
        </svg>
        {open && (
          <div className={`${headerStyles.popUpMenuContainer}`}>
            <div className={headerStyles.topSection} >
              <div className={headerStyles.themeToggleWrapper}>
                <div className={headerStyles.toggleContainer}
                  onClick={toggleTheme}
                >
                  <div className={lightTheme ? headerStyles.toggleBtnDivLeft : headerStyles.toggleBtnDivRight}  >
                    <div className={headerStyles.toggleIconDiv} >
                      {lightTheme ?
                        <Icon className={headerStyles.toggleIconLight} icon="mingcute:sun-line" color="#f3b821" /> :
                        <Icon className={headerStyles.toggleIconDark} icon="akar-icons:moon" color="#5d6175" />
                      }
                    </div>
                    <div className={headerStyles.toggleTextDiv} >
                      <p>
                        {lightTheme ? "Light" : "Dark"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
              <Link to="/user/settings" onClick={settingsLinkedClicked} className={headerStyles.settingsLinkContainer}
              >
                {/* <Icon className={headerStyles.settingsIcon} icon="lucide:settings-2" rotate={1} /> */}
                <div className={headerStyles.iconDiv} >
                  <SettingsIcon />
                </div>

                <p className={headerStyles.settingsText}>Settings</p>
              </Link>
            </div>
            <div className={headerStyles.bottomSection} >
              <div className={headerStyles.logOutDiv} >
                <div className={headerStyles.logOutIconDiv} >
                  < LogoutIcon />
                </div>
                <p className={headerStyles.logoutText} onClick={logOutBtnClicked} >Logout</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div >
  );
};
export default HeaderBar;
{/* <div className={headerStyles.leftPortion}>
        <div className={headerStyles.logoContainer}>
          <AppLogo />
        </div>
      </div>
      <div className={headerStyles.rightPortion}>
        <div
          className={
            searchMode ? headerStyles.inputContainer : headerStyles.inputContainerSmall
          }
        >
          {searchMode ? (
            <div className={headerStyles.inputDiv}>
              <input
                className={headerStyles.searchInput}
                value={searchQuery}
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              ></input>
            </div>
          ) : null}

          {searchMode ? (
            <div onClick={switchSearchMode} className={headerStyles.searchIconDiv}>
              <HiX fontSize="16px" className={headerStyles.inputXIcon} />
            </div>
          ) : (
            <div onClick={switchSearchMode} className={headerStyles.searchIconDiv}>
              <RiSearch2Line fontSize="16px" color="#00b7fd" />
            </div>
          )}
        </div>


        <div className={headerStyles.popupWrapper} ref={node}>
          <div className={headerStyles.userBadgeWrapper}>
            <div className={headerStyles.userBadgeContainer}>
              <div className={headerStyles.userBadgeCircle}>
                {user.firstName ? <p>{user.firstName.charAt(0)}</p> : null}
              </div>
            </div>
            <div className={headerStyles.menuBtnWrapper}>
              <svg
                onClick={() => setOpen((open) => !open)}
                className={headerStyles.menuBtn}
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3.27466" cy="3.45581" r="3" fill="#9baece" />
                <circle cx="3.27466" cy="13.4558" r="3" fill="#9baece" />
                <circle cx="13.2747" cy="13.4558" r="3" fill="#9baece" />
                <circle cx="13.2747" cy="3.45581" r="3" fill="#9baece" />
              </svg>
            </div>
          </div>
          {open && (
            <div className={`${headerStyles.popUp}`}>
              <div className={headerStyles.nameDiv}>
                <p>{user.firstName + " " + user.lastName}</p>
              </div>

              <div className={headerStyles.themeToggleWrapper}>
                <p className={headerStyles.toggleThemeText}>Dark mode </p>
                <div
                  onClick={toggleAppTheme}
                  className={`${theme === "dark"
                    ? headerStyles.toggleSwitchDark
                    : headerStyles.toggleSwitchLight
                    }`}
                >
                  <div className={headerStyles.toggleCircle}></div>
                </div>
              </div>
              <div className={headerStyles.lgOutBtnDiv}>
                <button className={headerStyles.lgOutBtn} onClick={handleLogout}>
                  {place === "logout" && isLoading === true ? (
                    <CircleSpinner size={15} color="white" loading={true} />
                  ) : (
                    <p>Log Out</p>
                  )}
                </button>
              </div>

              <div className={headerStyles.settingsDiv}>
                <Link to="/home/user/settings">Settings</Link>
              </div>
            </div>
          )}
        </div>
      </div> */}