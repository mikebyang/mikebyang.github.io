//global vars
var pics, pics_AR; //pics_AR -> image aspect ratio
var headings, paragraph_text, line_height, sect_margs, pg_pad_hb, pg_pad_wb, pg_marg_hb, pg_marg_wb;
//default attributes
const DEF_WIN_SIZE = [1920, 1080]; //width, length

const DEF_SIZE =[
    new element_object("#profile_pic", "profile", [[180,200],[2040,2568]]), //profile pic
    new element_object("#front_page img", "social media icons", [[45,45],[1,1]]), //social media icons
    new element_object("#arrow", "arrow", [[55,55],[1,1]]), //arrow
    new element_object("#pwrlift_img", "hobbies", [[600,480],[2228,1783]]), //powerlifting image
    new element_object("#photography", "hobbies", [[600,400],[2448,1632]]), //photography image

    // new element_object("p", "line height", 25), //line height
    new element_object(".section", "", [175,0]), //section padding
    new element_object(".subhead h3", "", 24) //subheader margins
];
//HB->height based, WB->width based
const MIN_SIZES = {
    "profile": 200,
    "social media icons": 45,
    "arrow": 55,
    "hobbies": 400,

    "line height": 35

    // "headings": [16,19,24], //h5, h3, h2
    // "paragraphs": [18, 30, 70, 20], //blurbs, greeting, name, front page description
    // "image size": [[200,180],[45,45],[55,55], [550, 400], [550,400]], //profile, icons, logo, arrow, powerlifting, photography
    // "section padding": [150,0,150,0], //about_section, exp_section, hobs_section
    // "pg pad hb": [[350,0,0,0], [50,0,50,0], [100,0,100,0],[50,0,0,0]], //front_page div:first-child, .table_div, hobs_section .table_div, powerlifting img
    // "pg pad wb": [[0,50,0,0], [0,0,0,50], [0,0,0,50]], //.td_cpname_div, .td_des_div, .td_nodes_div
    // "pg marg hb":[[50,0,0,0], [0,0,50,0]], //.button, .intro h2, 
    // "pg marg hb": [[0, 600, 0, 600], [0, 600, 0, 600], [0,300,0,300], [0,450,0,450]] //.intro, about_section div:nth-child(3), .table_div, about_section .table_div
};
const PICS_AR=[[2040,2568], [1,1], [1,1], [2228,1783], [2448,1632]]; //headshot, icons, dwn_arrow, powerlifting, photography 

function resize_im(size_frac, original_size, pic_AR){
    let new_size = [0,0];
    if(original_size[0] > original_size[1]){
        new_size[0] = original_size[0] * size_frac;
        new_size[1] = new_size[0] / (pic_AR[0]/pic_AR[1]);
    }
    else{
        new_size[1] = original_size[1] * size_frac;
        new_size[0] = new_size[1]*(pic_AR[0]/pic_AR[1]);
    }
    return new_size;
}

function page_format(){
    //ratios
    let win_ratio = Math.ceil(((window.innerWidth*window.innerHeight) / (DEF_WIN_SIZE[0]*DEF_WIN_SIZE[1]))*10);
    let winw_ratio = Math.ceil((window.innerWidth/DEF_WIN_SIZE[0])*10);
    let winh_ratio = Math.ceil((window.innerHeight/DEF_WIN_SIZE[1])*10);
    winw_ratio/=10;
    winh_ratio/=10;
    win_ratio/=10;
    
    let element = 0;
    let newSize;
    for(let e of DEF_SIZE.slice(element, element+5)){
        newSize = resize_im(win_ratio, e.default_size[0], e.default_size[1]);
        if(newSize[0]<MIN_SIZES[e.catagory] ||
            newSize[1] < MIN_SIZES[e.catagory]/(e.default_size[1][0]/e.default_size[1][1])){
            newSize = [
                MIN_SIZES[e.catagory],
                MIN_SIZES[e.catagory]/(e.default_size[1][0]/e.default_size[1][1])
            ];
        }
        console.log(newSize);
        $(e.object_id).css({"width": newSize[0].toString()+"px", "height": newSize[1].toString()+"px"});
    }
    element+=5;

    // $(DEF_SIZE[element].object_id).css("line-height", (DEF_SIZE[element].default_size*winh_ratio).toString()+"px");
    // element+=1;

    $(DEF_SIZE[element].object_id).css("padding", (DEF_SIZE[element].default_size[0]*winh_ratio).toString()+"px "+
    (DEF_SIZE[element].default_size[1]*winh_ratio).toString()+"px");
    element+=1;

    // $(DEF_SIZE[element].object_id).css("margin-bottom", (DEF_SIZE[element].default_size*winh_ratio).toString()+"px");
}

$(window).on("load", function(){
    page_format();
});

$(window).on("resize", function(){
    page_format();
});

// $(window).ready(function(){
//     $("#main_stage").scroll(function(){
//         console.log("scrolled");
//     })
// });