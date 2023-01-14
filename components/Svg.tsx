import { getCharacterColor } from "../common/helpers";

// Gloomhaven
import BR from "../public/icons/classes/gh/BR.svg";
import CH from "../public/icons/classes/gh/CH.svg";
import MT from "../public/icons/classes/gh/MT.svg";
import SC from "../public/icons/classes/gh/SC.svg";
import SW from "../public/icons/classes/gh/SW.svg";
import TI from "../public/icons/classes/gh/TI.svg";
import BE from "../public/icons/classes/gh/BE.svg";
import BT from "../public/icons/classes/gh/BT.svg";
import DS from "../public/icons/classes/gh/DS.svg";
import EL from "../public/icons/classes/gh/EL.svg";
import NS from "../public/icons/classes/gh/NS.svg";
import PH from "../public/icons/classes/gh/PH.svg";
import QM from "../public/icons/classes/gh/QM.svg";
import SB from "../public/icons/classes/gh/SB.svg";
import SK from "../public/icons/classes/gh/SK.svg";
import SS from "../public/icons/classes/gh/SS.svg";
import SU from "../public/icons/classes/gh/SU.svg";

// Forgotten Circles
import DR from "../public/icons/classes/fc/DR.svg";

// Jaws of the Lion
import DE from "../public/icons/classes/jotl/DE.svg";
import HA from "../public/icons/classes/jotl/HA.svg";
import RG from "../public/icons/classes/jotl/RG.svg";
import VW from "../public/icons/classes/jotl/VW.svg";

// Crimson Scales
import AA from "../public/icons/classes/cs/AA.svg";
import BK from "../public/icons/classes/cs/BK.svg";
import BM from "../public/icons/classes/cs/BM.svg";
import CG from "../public/icons/classes/cs/CG.svg";
import CT from "../public/icons/classes/cs/CT.svg";
import FK from "../public/icons/classes/cs/FK.svg";
import HO from "../public/icons/classes/cs/HO.svg";
import HP from "../public/icons/classes/cs/HP.svg";
import LU from "../public/icons/classes/cs/LU.svg";
import MF from "../public/icons/classes/cs/MF.svg";
import QA from "../public/icons/classes/cs/QA.svg";
import RM from "../public/icons/classes/cs/RM.svg";
import SP from "../public/icons/classes/cs/SP.svg";
import ST from "../public/icons/classes/cs/ST.svg";

// Frosthaven
import BB from "../public/icons/classes/fh/BB.svg";
import BN from "../public/icons/classes/fh/BN.svg";
import BO from "../public/icons/classes/fh/BO.svg";
import DF from "../public/icons/classes/fh/DF.svg";
import DW from "../public/icons/classes/fh/DW.svg";
import GE from "../public/icons/classes/fh/GE.svg";
import CR from "../public/icons/classes/fh/CR.svg";
import DT from "../public/icons/classes/fh/DT.svg";
import FF from "../public/icons/classes/fh/FF.svg";
import HV from "../public/icons/classes/fh/HV.svg";
import IF from "../public/icons/classes/fh/IF.svg";
import ME from "../public/icons/classes/fh/ME.svg";
import PC from "../public/icons/classes/fh/PC.svg";
import PY from "../public/icons/classes/fh/PY.svg";
import SD from "../public/icons/classes/fh/SD.svg";
import SH from "../public/icons/classes/fh/SH.svg";
import TA from "../public/icons/classes/fh/TA.svg";

// Trail of Ashes
import IN from "../public/icons/classes/toa/IN.svg";
import RH from "../public/icons/classes/toa/RH.svg";
import SR from "../public/icons/classes/toa/SR.svg";
import TP from "../public/icons/classes/toa/TP.svg";
import TR from "../public/icons/classes/toa/TR.svg";
import VQ from "../public/icons/classes/toa/VQ.svg";

const iconMap = {
  // Gloomhaven
  BR,
  CH,
  MT,
  SC,
  SW,
  TI,
  BE,
  BT,
  DS,
  EL,
  NS,
  PH,
  QM,
  SB,
  SK,
  SS,
  SU,

  // Forgotten Circles
  DR,

  // Jaws of the Lion
  DE,
  HA,
  RG,
  VW,

  // Crimson Scales
  AA,
  BK,
  BM,
  CG,
  CT,
  FK,
  HO,
  HP,
  LU,
  MF,
  QA,
  RM,
  SP,
  ST,

  // Frosthaven
  BB,
  BN,
  BO,
  DF,
  DW,
  GE,
  CR,
  DT,
  FF,
  HV,
  IF,
  ME,
  PC,
  PY,
  SD,
  SH,
  TA,

  // Trail of Ashes
  IN,
  RH,
  SR,
  TP,
  TR,
  VQ,
};

type SvgCharacterIconProps = {
  character: string;
};

const SvgCharacterIcon = ({ character }: SvgCharacterIconProps) => {
  const Icon = iconMap[character];

  if (!Icon) return <div />;

  return (
    <Icon fill={getCharacterColor(character)} height="24px" width="24px" />
  );
};

export default SvgCharacterIcon;
