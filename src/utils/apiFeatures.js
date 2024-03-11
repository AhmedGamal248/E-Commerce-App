export class ApiFeatures {
  constructor(mongooseQuery, searchQuery) {
    (this.mongooseQuery = mongooseQuery),
    (this.searchQuery = searchQuery);
  }

  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    let page = this.searchQuery.page * 1 || 1;
    let limit = 5;
    let skip = (page - 1) * limit;
    this.pageNum = page;
    // this.prevuoisP = page-1;
    this.nexP = page+1;
    this.mongooseQuery.skip(skip).limit(limit);
    return this
  }

  filteration () {
    let filterObj = {...this.searchQuery};
    let execludeFields = ["page", "sort", "fields", "keyword"];

    execludeFields.forEach((element) => {
      delete filterObj[element];
    });

    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (match) => "$" + match);
    filterObj = JSON.parse(filterObj);

    this.mongooseQuery.find(filterObj)
    return this
  }

  sort () {
    if (this.searchQuery.sort) {
        let sortedBy = this.searchQuery.sort.split(',').join(' ');
        this.mongooseQuery.sort(sortedBy);
      }
      return this
  }

  fields () {
    if (this.searchQuery.fields) {
        let fields = this.searchQuery.fields.split(',').join(' ');
        this.mongooseQuery.select(fields);
      }
      return this
  }

  search () {
    if(this.searchQuery.keyword) {
        this.mongooseQuery.find({$or: [
            {title:{ $regex: this.searchQuery.keyword}},
            {description:{ $regex: this.searchQuery.keyword}},
            {name:{ $regex: this.searchQuery.keyword}}
        ]})
      }
      return this
  }

}
