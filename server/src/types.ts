export interface Userinfo{
    id:string,
    pass:string
}

export interface Content{
    word:string;
    mean:string[];
    synonym:string[]
};

export interface Share{
    title:string;
    type:string;
    content:Content[];
}

export interface makeuser{ // 유저정보
    '_id'?:string,
    id?:string,
    hash?:string,
    mail?:string,
    isAdmin?:boolean,
    made?:{
        share:Share[],
        unshare:Share[]
    },
    banned?:boolean,
    native?:string//기본설정은 한국
};
export interface mailsec{
    mail:string,
    address:string
}
export interface query{
    share:'share'|'unshare',
    title:string
}

export interface question{
    WtoM?:object[],
    WtoS?:object[],
    MtoW?:object[],
    MtoS?:object[],
    StoW?:object[],
    StoM?:object[]
}

export interface examdata{
    _id?:string,
    examinee?:string,
    madeby?:string,
    number?:{
        WtoM?:number,
        WtoS?:number,
        MtoW?:number,
        MtoS?:number,
        StoW?:number,
        StoM?:number
    },
    question?:{
        WtoM?:object[],
        WtoS?:object[],
        MtoW?:object[],
        MtoS?:object[],
        StoW?:object[],
        StoM?:object[]
    },
    share?:"share" | "unshare",
    title?: string,
    type?:string
}
export interface lol{
    examinee:string,
    share:'share' | 'unshare',
    madeby:string,
    title?:string
}

export interface ques{
    answer:number,
    choice:string[],
    question:string,
    result?:'correct' | 'wrong',
    chosen?:string
}