import "@babel/polyfill"; // 새로 추가된 전역 객체들(Promise, Map, Set)을 사용가능한 객체로 바꾸어주는 개념 import Accordions from "@/js/Actives/basic";

/* base */
import '@/css/base/reset.css';

// Actives
import Accordions from "@/js/Actives/accordions";
import Tabs from "@/js/Actives/tabs";
import ToggleDynamic from "@/js/Actives/toggleDynamic";

// Breakpoints
import BreakPoints from "@/js/Breakpoints/index";

// Cookie
import Cookie from "@/js/Cookie/jscookie";

// Cookie
import Motion from "@/js/Customization/dotcircle";

// Helpers (프로젝트 젠체의 공유해서 사용하는 파일)
import {comma, unComma, dataGroups, dataFilter, dataArray} from '@/js/Helpers/common'
import {DetectIE} from "@/js/Helpers/IE";

// MoreViews
import Item from "@/js/MoreViews/item";
import Ratio from "@/js/MoreViews/ratio";

// Motion3D
import MotionBasic from "@/js/Motion3D/motionBasic";
import MotionSlide from "@/js/Motion3D/motionSlide";

// Scroll
import ScrollEffect from "@/js/Scroll/scrollEffect";

export {
    Accordions,
    Tabs,
    ToggleDynamic,
    BreakPoints,
    comma, unComma, dataGroups, dataFilter, dataArray,
    DetectIE,
    Cookie,
    Motion,
    Item,
    Ratio,
    MotionBasic,
    MotionSlide,
    ScrollEffect
};