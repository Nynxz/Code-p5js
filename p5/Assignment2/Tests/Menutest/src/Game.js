function preload(){

}

function setup(){
createCanvas(1000, 500);
    background(200);
    //menu = new Menu('Start', 'Quit', 'Options', 'Test'); , onClick: Button.OnClick(this.name)
    mainMenu = new Menu(StartGroup,
        {name: 'Race', OnClick: ChangeDrawLayer.bind(null, raceMenu)},
        {name:'Options',  OnClick: function(){
            console.log("Options");
        }},
        {name:'Quit', onClick: function(){
            //console.log("Quit");
        }});
    
        raceMenu = new Menu(PreRaceGroup,
            {name: 'Car Select', OnClick: function(){
                console.log('Car Select');
            }},
            {name: 'Map Select'},
            {name: 'Race!'},
            {name: 'Return', OnClick: ChangeDrawLayer.bind(null, mainMenu)}
        );
    //frameRate(5);
    console.log('sgroup:' , raceMenu);
    ChangeDrawLayer(mainMenu)
}