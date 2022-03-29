export interface status{
    status:'good' | 'bad',
    url?:'/',
    reason?:string
}

export interface randomword{
    status: 'good' | 'bad',
    word:string
}
export interface made{
    share:object[],
    unshare:object[]

}
export interface wordinfo{
    word:HTMLDivElement[],
    mean:HTMLDivElement[],
    synonym:HTMLDivElement[]
}
export interface wordcard{
    word?:string,
    mean?:string[],
    synonym?:string[]
}

export interface query{
    share:string,
    title:string
}
export interface card{
    title:string,
    type:'wordcard',
    content:object[]
}

export interface exam{
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
        WtoM?:ques[],
        WtoS?:ques[],
        MtoW?:ques[],
        MtoS?:ques[],
        StoW?:ques[],
        StoM?:ques[]
    },
    share?:"share" | "unshare",
    title?: string,
    type?:string
}

export type Num = {
    WtoM?:object[];
    WtoS?:object[];
    MtoW?:object[];
    MtoS?:object[];
    StoW?:object[];
    StoM?:object[];
}

export interface ques{
    answer:number,
    choice:string[],
    question:string,
    result?:'correct' | 'wrong',
    chosen?:string
}