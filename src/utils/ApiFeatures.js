export class ApiFeatures {
    constructor(mongooseQuery, queryString){
        this.mongooseQuery=mongooseQuery
        this.queryString=queryString
    }
    paginate (){
        let  PAGE_NUMBER = this.queryString.page *1 ||1
        if(PAGE_NUMBER <=0)PAGE_NUMBER=1
        const SKIP= (PAGE_NUMBER -1 ) *5
        this.page = PAGE_NUMBER
        this.mongooseQuery.skip(SKIP).limit(5);
        return this;
    }
    filter(){
        let filterObj ={...this.queryString}
        let excludedQuery = ['page', 'sort', 'fields', 'keyword']
        excludedQuery.forEach((q)=>{
            delete filterObj[q];
        })
        filterObj=JSON.stringify(filterObj)
        filterObj= filterObj.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this;
    }
    sort(){
        if(this.queryString.sort)
        {
            let sortedBy =this.queryString.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy)

        }
        return this;
    }
    search(){
        if(this.queryString.keyword){
            this.mongooseQuery.find(
                {
                    $or:
                    [
                        {title:{$regex:this.queryString.keyword,$option:'i'}},
                        {description:{$regex:this.queryString.keyword,$option:'i'}}
                    ]
                }
            )
        }
        return this
    }
    fields(){
        if(this.queryString.fields){
            let fields =this.queryString.fields.split(',').join(' ')
            this.mongooseQuery.sort(fields)
        }
        return this
    }

}