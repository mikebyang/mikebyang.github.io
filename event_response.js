//global vars
var pics, pics_AR; //pics_AR -> image aspect ratio
var headings, paragraph_text, line_height, sect_margs, pg_pad_hb, pg_pad_wb, pg_marg_hb, pg_marg_wb, arrws;
//default attributes
const DEF_ARRW_POS = 30;
const DEF_WIN_SIZE = [1920, 1080]; //width, length
const DEF_LINE_H = 35;

const DEF_HEADINGS = [16,19,24]; //h5, h3, h2
const DEF_PARA_SIZE = [18, 30, 70, 20]; //blurbs, greeting, name, front page description

const DEF_IM_SIZE = [[200,180],[45,45],[55,55], [550, 400], [550,400]]; //profile, icons, logo, arrow, powerlifting, photography
const PICS_AR=[[2040,2568], [1,1], [1,1], [2228,1783], [2448,1632]];//headshot, icons, dwn_arrow, powerlifting, photography

//HB->height based, WB->width based
const DEF_SECT_PAD = [150,0,150,0]; //about_section, exp_section, hobs_section
const DEF_PG_PAD_HB = [[350,0,0,0], [50,0,50,0], [100,0,100,0],[50,0,0,0]]; //front_page div:first-child, .table_div, hobs_section .table_div, powerlifting img
const DEF_PG_PAD_WB = [[0,50,0,0], [0,0,0,50], [0,0,0,50]]; //.td_cpname_div, .td_des_div, .td_nodes_div
const DEF_PG_MARG_HB = [[50,0,0,0], [0,0,50,0]]; //.button, .intro h2, 
const DEF_PG_MARG_WB = [[0, 600, 0, 600], [0, 600, 0, 600], [0,300,0,300], [0,450,0,450]]; //.intro, about_section div:nth-child(3), .table_div, about_section .table_div

// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }    

function resize_im(pic_AR, size_frac, original_size){
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

function font_resize(txt_size, ratio){
    return txt_size*ratio;
}

function page_format(){
    //ratios
    let win_ratio = Math.ceil(((window.innerWidth*window.innerHeight) / (DEF_WIN_SIZE[0]*DEF_WIN_SIZE[1]))*10);
    if(win_ratio%2 != 0){
        win_ratio+=1;
    }
    let winw_ratio = Math.ceil((window.innerWidth/DEF_WIN_SIZE[0])*10);
    if(winw_ratio%2 != 0){
        winw_ratio+=1;
    }
    let winh_ratio = Math.ceil((window.innerHeight/DEF_WIN_SIZE[1])*10);
    if(winh_ratio%2 != 0){
        winh_ratio+=1;
    }
    winw_ratio/=10;
    winh_ratio/=10;
    win_ratio/=10;
    //resize images
    let sizing;
    for(let a = 0; a<pics.length; a++){
        sizing = resize_im(PICS_AR[a], win_ratio, DEF_IM_SIZE[a]);
        pics[a].width(sizing[0]), pics[a].height(sizing[1]);
    }
    //text resizing
    for(let h=0; h<headings.length; h++){
        headings[h].css("font-size", font_resize(DEF_HEADINGS[h],winw_ratio).toString()+"px");
    }
    for(let i = 0; i<paragraph_text.length; i++){
        paragraph_text[i].css("font-size", font_resize(DEF_PARA_SIZE[i], winw_ratio).toString()+"px");
    }
    line_height.css("line-height",font_resize(DEF_LINE_H,winh_ratio).toString()+"px");
    //margins
    let marg_str = "";
    // for(let j = 0; j<pag_margins.length; j++){
    //     for(let k = 0; k<4;k++){
    //         marg_str+=((DEF_PG_MARGIN[j][k]*win_ratio).toString()+"px");
    //         if(k != 3){
    //             marg_str+=" ";
    //         }
    //     }
    //     pag_margins[j].css("margin", marg_str);
    //     marg_str="";
    // }
    for(let margwb = 0; margwb<pg_marg_wb.length; margwb++){
        for(let k = 0; k<4;k++){
            marg_str+=((DEF_PG_MARG_WB[margwb][k]*winw_ratio).toString()+"px");
            if(k != 3){
                marg_str+=" ";
            }
        }
        pg_marg_wb[margwb].css("margin", marg_str);
        marg_str="";
    }
    for(let marghb = 0; marghb<pg_marg_hb.length; marghb++){
        for(let k = 0; k<4;k++){
            marg_str+=((DEF_PG_MARG_HB[marghb][k]*winh_ratio).toString()+"px");
            if(k != 3){
                marg_str+=" ";
            }
        }
        pg_marg_hb[marghb].css("margin", marg_str);
        marg_str="";
    }
    //padding
    let padd_str = "";
    // for(let pad = 0; pad<pag_padd.length; pad++){
    //     for(let k = 0; k<4;k++){
    //         padd_str+=((DEF_PG_PAD[pad][k]*win_ratio).toString()+"px");
    //         if(k != 3){
    //             padd_str+=" ";
    //         }
    //     }
    //     pag_padd[pad].css("padding",padd_str);
    //     padd_str="";
    // }
    for(let sect = 0; sect<sect_margs.length; sect++){
        for(let k = 0; k<4;k++){
            padd_str+=((DEF_SECT_PAD[k]*winh_ratio).toString()+"px");
            if(k != 3){
                padd_str+=" ";
            }
        }
        sect_margs[sect].css("padding",padd_str);
        padd_str="";
    }
    for(let wbpad = 0; wbpad<pg_pad_wb.length; wbpad++){
        for(let k = 0; k<4;k++){
            padd_str+=((DEF_PG_PAD_WB[wbpad][k]*winw_ratio).toString()+"px");
            if(k != 3){
                padd_str+=" ";
            }
        }
        pg_pad_wb[wbpad].css("padding",padd_str);
        padd_str="";
    }
    for(let hbpad = 0; hbpad<pg_pad_hb.length; hbpad++){
        for(let k = 0; k<4;k++){
            padd_str+=((DEF_PG_PAD_HB[hbpad][k]*winh_ratio).toString()+"px");
            if(k != 3){
                padd_str+=" ";
            }
        }
        pg_pad_hb[hbpad].css("padding",padd_str);
        padd_str="";
    }
    

    //arrows
    arrws[0].css("bottom", (DEF_ARRW_POS*winh_ratio).toString()+"px");
}

$(window).on("load", function(){
    pics=[$("#about_section img"),$("li a img"),$("#darrow"),$("#powerlifting img"),$("#photography img")];
    headings=[$("h5"),$("h3"),$("h2")];
    paragraph_text=[$("p"),$("#greeting"),$("#full_name"),$(".desc")];
    line_height=$("p");

    sect_margs=[$("#about_section"),$("#exp_section"),$("#hobs_section")];
    pg_pad_hb=[$("#front_page div:first-child"),$(".table_div"),$("#hobs_section .table_div"),$("#powerlifting img")];
    pg_pad_wb=[$(".td_cpname_div"),$(".td_des_div"),$(".td_nodes_div")];

    pg_marg_hb=[$(".button"),$(".intro h2")];
    pg_marg_wb=[$(".intro"),$("#about_section div:nth-child(3)"),$(".table_div"),$("#about_section .table_div")];
    
    arrws=[$("#front_page div:last-child")];
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