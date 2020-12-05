const getMenuFrontEnd = (role="USER_ROLE")=>{
    const menu= [{
        titulo:"Dashboard",
        icon:"mdi mdi-gauge",
         submenus:[
           {titulo:"Main", url:""},
           {titulo:"ProgressBar", url:"progress"},
           {titulo:"Graficas", url:"grafica1"},
           {titulo:"Promesas", url:"promesas"},
           {titulo:"RXjs", url:"rxjs"}
         ]
        },
        {
          titulo:"Mantenimientos",
          icon:"mdi mdi-folder-lock-open",
           submenus:[
             {titulo:"Hospitales", url:"hospitales"},
             {titulo:"Medicos", url:"medicos"}
           ]
          }
      ]

      if(role==="ADMIN_ROLE"){
        menu[1].submenus.unshift({titulo:"Usuarios", url:"usuarios"}); 
      }

      return menu;
}


module.exports={
  getMenuFrontEnd
}