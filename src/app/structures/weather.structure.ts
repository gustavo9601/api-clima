export interface Weather{
  name?:string;
  cod?: number;
  icon?: string;
  description?:string;
  temp?:number;
  main?:string;
  minMaxTemp ?: MinMaxInterface;
}

interface MinMaxInterface{
  date ?: number;  //numero del dia en el mes
  day ?: number;  //numero de la semana
  month ?: number;
  min ?: number;
  max ?: number;
}
