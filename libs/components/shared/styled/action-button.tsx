export const buttonClass = (disabled?: boolean) =>
  `font-inherit text-center rounded-lg no-underline leading-4 
     border ${disabled ? 'border-[#D7D7D7] bg-[#D7D7D7] text-[#ACACAC]' : 'hover:border-primary hover:bg-white hover:text-primary'}
     text-white bg-primary py-[10px] px-[23px] 
     transition-all ease duration-300`
