import{d as o,u as r}from"./iframe-B07M51QV.js";import{D as t}from"./Dropdown-ChlMSqnu.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Components/Dropdown",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:"text"},disabled:{control:"boolean"},error:{control:"text"}},decorators:[a=>r("div",{style:{minHeight:"300px",width:"300px"},children:r(a,{})})]},s=[{label:"Retail Store Owner",value:"1"},{label:"Convenience Shop",value:"2"},{label:"Hospitality",value:"3"},{label:"Catering & Events",value:"4"},{label:"Online/Delivery Only",value:"5"},{label:"Hospitality",value:"6"},{label:"Catering & Events",value:"7"},{label:"Online/Delivery Only",value:"8"}],e={args:{label:"Label",options:s,required:!0,icon:!0},render:a=>{const[l,n]=o("");return r(t,{...a,value:l,onChange:n})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    options,
    required: true,
    icon: true
  },
  render: args => {
    const [value, setValue] = useState('');
    return <Dropdown {...args} value={value} onChange={setValue} />;
  }
}`,...e.parameters?.docs?.source}}};const d=["Default"];export{e as Default,d as __namedExportsOrder,p as default};
