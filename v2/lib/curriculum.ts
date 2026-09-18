export type StageId = "fs1" | "fs2" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6";
export type SubjectId = "english" | "maths" | "science" | "computing" | "geography" | "history" | "wellbeing";
export type Unit = { title: string; icon: string; outcomes: string[] };
export type Subject = { id: SubjectId; title: string; icon: string; description: string; units: Unit[] };
export type Stage = { id: StageId; label: string; age: string; phase: "early" | "lower" | "middle" | "upper"; theme: string; focus: string; subjects: Subject[] };

const earlyEnglish = (level: 1 | 2): Subject => ({
  id:"english", title:"Letters & Language", icon:"🔤",
  description: level===1 ? "Sounds, listening, vocabulary and mark making." : "Phonics, blending, early reading and sentence talk.",
  units: level===1 ? [
    {title:"My first sounds",icon:"👂",outcomes:["Listen for sounds","Repeat simple sounds","Match sound and picture"]},
    {title:"Letters around me",icon:"🔠",outcomes:["Notice letter shapes","Trace big movements","Say familiar words"]},
    {title:"Talk and tell",icon:"💬",outcomes:["Name everyday objects","Use short phrases","Take turns speaking"]},
  ] : [
    {title:"Letter sounds",icon:"🔤",outcomes:["Recall common sounds","Match initial sounds","Form familiar letters"]},
    {title:"Blend and read",icon:"📖",outcomes:["Blend simple sounds","Read short words","Use picture clues"]},
    {title:"My first sentences",icon:"✏️",outcomes:["Say a complete idea","Sequence 2–3 events","Copy short words"]},
  ]
});

const earlyMaths = (level:1|2):Subject => ({
  id:"maths",title:"Early Maths",icon:"🔢",
  description: level===1 ? "Counting, sorting, shape and comparison through play." : "Number sense, simple operations, patterns and measures.",
  units: level===1 ? [
    {title:"Numbers 1–5",icon:"🖐️",outcomes:["Count objects","Match quantity to number","Recognise small groups"]},
    {title:"Shapes everywhere",icon:"🔺",outcomes:["Name circle, square, triangle","Sort by shape","Build pictures"]},
    {title:"Big, small, more, less",icon:"⚖️",outcomes:["Compare size","Compare groups","Use simple measure words"]},
  ] : [
    {title:"Numbers 1–20",icon:"🔟",outcomes:["Count forward and back","Order numbers","Represent quantities"]},
    {title:"Add and take away",icon:"➕",outcomes:["Combine small groups","Take away objects","Explain with pictures"]},
    {title:"Patterns & measures",icon:"📏",outcomes:["Continue patterns","Compare length","Sequence daily events"]},
  ]
});

const earlyScience = (level:1|2):Subject => ({
  id:"science",title:"Science Discovery",icon:"🔬",
  description:"Observe, ask, compare and talk about the world through safe hands-on discovery.",
  units: level===1 ? [
    {title:"Living around us",icon:"🐞",outcomes:["Notice animals and plants","Describe simple changes","Care for living things"]},
    {title:"My body & senses",icon:"👀",outcomes:["Name body parts","Explore senses","Talk about healthy routines"]},
    {title:"Materials I can touch",icon:"🧸",outcomes:["Describe texture","Sort objects","Explore water safely"]},
  ] : [
    {title:"Living and non-living",icon:"🌱",outcomes:["Classify familiar things","Describe needs of living things","Observe growth"]},
    {title:"Light, sound & movement",icon:"☀️",outcomes:["Explore light sources","Compare sounds","Describe movement"]},
    {title:"Weather watchers",icon:"🌦️",outcomes:["Observe weather","Record simple changes","Choose suitable clothing"]},
  ]
});

function primarySubjects(grade:number):Subject[] {
  const band = grade<=2 ? "lower" : grade<=4 ? "middle" : "upper";
  const english:Subject={id:"english",title:"English",icon:"📚",description:"Reading, speaking, vocabulary and writing with enquiry and communication.",units:
    band==="lower"?[
      {title:"Phonics & fluency",icon:"🔤",outcomes:["Decode age-appropriate words","Read aloud with confidence","Use new vocabulary"]},
      {title:"Stories & sequencing",icon:"🪄",outcomes:["Retell events","Describe characters","Write connected sentences"]},
      {title:"Information texts",icon:"📰",outcomes:["Find key facts","Ask and answer questions","Create a short fact page"]},
    ]:band==="middle"?[
      {title:"Reading for meaning",icon:"🔎",outcomes:["Infer simple meaning","Summarise key ideas","Compare text features"]},
      {title:"Grammar in context",icon:"🧩",outcomes:["Build varied sentences","Use punctuation accurately","Edit own work"]},
      {title:"Writing to explain",icon:"✍️",outcomes:["Plan paragraphs","Use evidence and detail","Present ideas clearly"]},
    ]:[
      {title:"Critical reading",icon:"🧠",outcomes:["Distinguish fact and opinion","Use textual evidence","Compare viewpoints"]},
      {title:"Purposeful writing",icon:"📝",outcomes:["Adapt tone","Structure extended texts","Revise for impact"]},
      {title:"Speaking & presenting",icon:"🎤",outcomes:["Organise presentations","Respond to questions","Use subject vocabulary"]},
    ]};
  const maths:Subject={id:"maths",title:"Maths",icon:"➗",description:"Problem-solving, reasoning, fluency, number sense and mathematical communication.",units:
    band==="lower"?[
      {title:"Number sense",icon:"🔢",outcomes:["Represent and compare numbers","Use place value","Explain strategies"]},
      {title:"Operations",icon:"➕",outcomes:["Add and subtract","Build multiplication ideas","Solve word problems"]},
      {title:"Shape & measure",icon:"📐",outcomes:["Describe 2D/3D shapes","Measure length and time","Read simple data"]},
    ]:band==="middle"?[
      {title:"Place value & calculation",icon:"🧮",outcomes:["Use efficient methods","Estimate and check","Solve multi-step problems"]},
      {title:"Fractions & decimals",icon:"🍕",outcomes:["Model fractions","Compare values","Connect fractions and decimals"]},
      {title:"Geometry & data",icon:"📊",outcomes:["Reason about angles and shapes","Interpret graphs","Use measures accurately"]},
    ]:[
      {title:"Number & proportional thinking",icon:"⚖️",outcomes:["Use fractions, decimals and percentages","Reason with ratio","Choose efficient strategies"]},
      {title:"Algebraic thinking",icon:"🧩",outcomes:["Generalise patterns","Use simple formulae","Solve missing-value problems"]},
      {title:"Statistics & geometry",icon:"📈",outcomes:["Interpret data critically","Calculate with measures","Reason about properties"]},
    ]};
  const science:Subject={id:"science",title:"Science",icon:"🔬",description:"Enquiry-led science using observation, fair testing, evidence and real-life contexts.",units:
    grade===1?[
      {title:"Living things",icon:"🌱",outcomes:["Classify living/non-living","Describe basic needs","Observe plants and animals"]},
      {title:"Materials",icon:"🪵",outcomes:["Name everyday materials","Compare properties","Choose materials for a purpose"]},
      {title:"Light & sound",icon:"💡",outcomes:["Identify sources","Observe shadows","Compare everyday sounds"]},
    ]:grade===2?[
      {title:"Plants & habitats",icon:"🌻",outcomes:["Describe plant needs","Compare habitats","Record growth"]},
      {title:"Forces & movement",icon:"🛝",outcomes:["Describe pushes and pulls","Compare movement","Ask testable questions"]},
      {title:"Healthy bodies",icon:"❤️",outcomes:["Identify healthy choices","Name body functions","Use observations as evidence"]},
    ]:grade<=4?[
      {title:"Life cycles & ecosystems",icon:"🦋",outcomes:["Model life cycles","Describe food relationships","Classify organisms"]},
      {title:"Matter & materials",icon:"🧪",outcomes:["Compare states/properties","Investigate changes","Record fair-test results"]},
      {title:"Energy, light & sound",icon:"⚡",outcomes:["Trace energy effects","Investigate light/sound","Explain patterns in results"]},
    ]:[
      {title:"Systems in living things",icon:"🫀",outcomes:["Describe connected body/plant systems","Interpret evidence","Use scientific models"]},
      {title:"Forces, electricity & energy",icon:"🔋",outcomes:["Build and reason about circuits","Investigate forces","Evaluate fair tests"]},
      {title:"Earth, space & change",icon:"🌍",outcomes:["Use models of Earth and space","Explain cycles","Communicate evidence-based conclusions"]},
    ]};
  const computing:Subject={id:"computing",title:"Computing",icon:"💻",description:"Project-based digital literacy, logic, programming and safe online behaviour.",units:[
    {title:"Digital creator",icon:"🎨",outcomes:["Create and edit digital content","Organise files","Choose suitable tools"]},
    {title:"Logic & coding",icon:"🤖",outcomes:["Sequence instructions","Use age-appropriate coding concepts","Test and debug"]},
    {title:"Safe & smart online",icon:"🛡️",outcomes:["Protect personal information","Use respectful communication","Check information sources"]},
  ]};
  const wellbeing:Subject={id:"wellbeing",title:"Wellbeing",icon:"💛",description:"Self-awareness, relationships, resilience, healthy routines and growth mindset.",units:[
    {title:"Know myself",icon:"🌟",outcomes:["Name strengths and feelings","Set a small goal","Reflect on progress"]},
    {title:"Healthy habits",icon:"🥗",outcomes:["Plan healthy routines","Recognise rest and movement needs","Make safe choices"]},
    {title:"Friends & resilience",icon:"🤝",outcomes:["Communicate respectfully","Solve small conflicts","Use strategies after mistakes"]},
  ]};
  const geography:Subject={id:"geography",title:"Geography",icon:"🗺️",description:"Place, environment, maps, people and global awareness.",units:[
    {title:"My place",icon:"📍",outcomes:["Use simple maps","Describe human/physical features","Compare places"]},
    {title:"Weather & environments",icon:"🌦️",outcomes:["Collect observations","Describe patterns","Connect people and environment"]},
    {title:"Our changing world",icon:"🌍",outcomes:["Explore sustainability","Use geographical evidence","Suggest responsible actions"]},
  ]};
  const history:Subject={id:"history",title:"History",icon:"🏺",description:"Chronology, evidence, cause and change through age-appropriate historical enquiry.",units:[
    {title:"Then and now",icon:"⏳",outcomes:["Order events","Compare past and present","Use simple sources"]},
    {title:"People & achievements",icon:"🏛️",outcomes:["Ask questions about the past","Use evidence","Explain significance"]},
    {title:"Change over time",icon:"🧭",outcomes:["Identify causes and effects","Compare accounts","Build a timeline"]},
  ]};
  return grade<=2?[english,maths,science,computing,wellbeing]:[english,maths,science,computing,geography,history,wellbeing];
}

export const stages:Stage[]=[
  {id:"fs1",label:"FS1",age:"3–4",phase:"early",theme:"sunny",focus:"Play, language, movement and first discoveries.",subjects:[earlyEnglish(1),earlyMaths(1),earlyScience(1)]},
  {id:"fs2",label:"FS2",age:"4–5",phase:"early",theme:"rainbow",focus:"Phonics, number confidence and guided enquiry.",subjects:[earlyEnglish(2),earlyMaths(2),earlyScience(2)]},
  ...Array.from({length:6},(_,i)=>{
    const grade=i+1;
    return {id:(\`g\${grade}\`) as StageId,label:\`Grade \${grade}\`,age:\`\${grade+5}–\${grade+6}\`,phase:grade<=2?"lower":grade<=4?"middle":"upper",theme:grade<=2?"garden":grade<=4?"explorer":"future",focus:grade<=2?"Strong foundations through stories, visuals and hands-on tasks.":grade<=4?"Independent thinking, projects and evidence.":"Deeper reasoning, ownership and confident communication.",subjects:primarySubjects(grade)} satisfies Stage;
  }),
];
export const getStage=(id:StageId)=>stages.find(s=>s.id===id)??stages[2];
