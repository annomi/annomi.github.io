var currentAjax = null;
var currentSetTime = null;
var lists = new Vue({
    el : "#main",
    data:{
        category:[],
        web_lists:[],
        cur_cid : '',
        is_edit:false,
        sour_name:'3333',
        sour_url:'',
        cur_sour_id:'',
        category_name:'',
        edit_cid:'',
        is_add_btn_show:true,
    },
    mounted:function () {
        this.loadCategory();
    },
    methods:{
        loadCategory:function () {
            var self = this;
            $.post('/custom/get-category',function (e) {
                self.category = e.lists;
                if (e.lists.length >= 12) {
                    self.is_add_btn_show = false;
                }else{
                    self.is_add_btn_show = true;
                }
                self.cur_cid = e.lists[0].cate_id;
                self.loadWebsite(self.cur_cid);
            });
        },
        cancelLoad:function(){
            clearTimeout(currentSetTime);
        },
        loadWebsite:function (cate_id) {
            var self = this;
            if (self.is_edit) {
                return false;
            }

            clearTimeout(currentSetTime);
            currentSetTime = setTimeout(function () {
                if(currentAjax) {currentAjax.abort();}
                currentAjax = $.post('/custom/get-website',{cate_id:cate_id},function (e) {
                    self.web_lists = [];
                    $.each(e.lists,function (index,item) {
                        self.web_lists.push(item);
                    });
                    // self.web_lists = e.lists;
                    self.cur_cid = cate_id;
                });
            },250);
        },
        edit:function () {
            if (is_guest === 1) {
                $("#LoginModal").modal('show');
                return false;
            }
            this.is_edit = true;
            $("#copyrightIndex").hide();
            $( ".sortable" ).sortable({
                items: ".allow-sort",
                stop: function( event, ui ) {
                    //is_update_sort=true;
                    $('.sort_category .item').each(function (index,item) {
                        $(this).attr('data-sort',index);
                    });

                    $('.sort_sour .item').each(function (index,item) {
                        $(this).attr('data-sort',index);
                    });
                },
                revert: true
            });
        },
        addSource:function (index) {
            $("#addSourceModal").modal('show');
            this.sour_name = this.web_lists[index].name;
            this.sour_url = this.web_lists[index].sour_url;
            this.cur_sour_id = this.web_lists[index].sour_id;
        },
        submitSource:function () {
            var self = this;
            if (self.sour_name.length <= 0) {
                showError('请输入网站名称');
                return false;
            }
            if (self.sour_name.length > 20) {
                showError('网站名称最多20个字');
                return false;
            }
            if (self.sour_url.length <= 0){
                showError('请输入网站URL地址');
                return false;
            }

            if (self.sour_url.length > 500){
                showError('网站URL地址最多500个字符');
                return false;
            }

            $.post('/source/add-source',
                {
                    sour_name:self.sour_name,
                    sour_url:self.sour_url,
                    sour_id:self.cur_sour_id,
                    cate_id:self.cur_cid
                },function (e) {
                if (e.code===1){
                    self.web_lists = e.lists;
                    $("#addSourceModal").modal('hide');
                } else {
                    showError(e.msg);
                }
            })
        },
        addCategory:function (index) {
            $("#addCategoryModal").modal('show');
            var self = this;

            if (index!='') {
                this.category_name = this.category[index].name;
                this.edit_cid = this.category[index].cate_id;
            } else {
                this.category_name = '';
                this.edit_cid = '';
            }
        },
        submitCategory:function () {
            var self = this;
            $.post('/source/add-category',
                {
                    cate_name:self.category_name,
                    cate_id:self.edit_cid
                },function (e) {
                    if (e.code===1){
                        self.category = e.lists;
                        if (e.lists.length >= 12) {
                            self.is_add_btn_show = false;
                        }else{
                            self.is_add_btn_show = true;
                        }
                        $("#addCategoryModal").modal('hide');
                    } else {
                        showError(e.msg);
                    }
                })
        },
        deleteCategory:function (index) {
            var self = this;
            var cate_id = this.category[index].cate_id;
            if (confirm("是否删除该分类？")) {
                $.post('/source/delete-category',{cate_id:cate_id},function (e) {
                    if (e.code===1) {
                        self.category = e.lists;
                        if (e.lists.length >= 12) {
                            self.is_add_btn_show = false;
                        }else{
                            self.is_add_btn_show = true;
                        }
                        showSuccess('删除成功');
                    } else {
                        showError(e.msg);
                    }
                });
            }
        },
        saveSort:function () {
            var sort = [];
            var cate_sort = [];
            var self = this;
            $.each($(".sort_sour .item"),function () {
                sort.push({"sour_id":$(this).attr('data-id'),"sort":$(this).attr('data-sort')});
            });

            $.each($(".sort_category .item"),function () {
                cate_sort.push({"cate_id":$(this).attr('data-id'),"sort":$(this).attr('data-sort')});
            });

            $(".sortable").sortable('destroy');
            self.web_lists = [];
            $.post('/custom/sour-sort',{sort:sort,cate_sort:cate_sort,cate_id:self.cur_cid},function (e) {
                if (e.code===1) {
                    $.each(e.lists,function (index, item) {
                        self.web_lists.push(item);
                    });
                    // self.web_lists = e.lists;
                    showSuccess('保存成功');
                    self.is_edit = false;
                } else {
                    showError(e.msg);
                }
            });
           $("#copyrightIndex").show(); 
        }
    }
});