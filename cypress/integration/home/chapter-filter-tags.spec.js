function fetchFirstPageChapters() {
    return cy.chapters({approved: true, page: 0, per_page: 10});
}

describe("Chapters filter tags ", () => {

    beforeEach(() => {
        cy.visit('/');
    })

    function getFilterButton() {
        return cy.get('.chapter-filters-section .tags-section-container .tags-filter-dropdown')
            .find('.tags-filter-dropdown-button');
    }

    function getFilterDropdownMenu() {
        return cy
            .get('.chapter-filters-section .tags-section-container .tags-filter-dropdown .tags-filter-dropdown-menu');
    }

    function getSeedChaptersTags() {
        return cy.tags({chapterTagsOnly: true});
    }

    it('Should search existing tags', () => {

        getSeedChaptersTags()
            .then((tags) => {

                getFilterButton()
                    .click();

                getFilterDropdownMenu()
                    .find('input.search-input')
                    .type(tags[0].name);

                getFilterDropdownMenu()
                    .find('.tag-select-item')
                    .find('label')
                    .contains(tags[0].name, {matchCase: false});
            });
    });

    it('Selected tags should be visible', () => {
        getSeedChaptersTags()
            .then((tags) => {

                getFilterButton()
                    .click();

                getFilterDropdownMenu()
                    .find('.tag-select-item label')
                    .contains(tags[0].name, {matchCase: false})
                    .find('input[type="checkbox"]')
                    .scrollIntoView()
                    .check();

                cy.get('.chapter-filters-section .selected-tags')
                    .find('button.tag-button')
                    .contains(tags[0].name, {matchCase: false});
            });
    });

    it('Clear all filters buttons should unselect all selected tags', () => {
        getFilterButton()
            .click();

        getSeedChaptersTags()
            .then((tags) => {

                tags.slice(0,3).map((tag) => {
                    cy.get('.tag-select-item label')
                        .contains(tag.name, {matchCase: false})
                        .find('input[type="checkbox"]')
                        .scrollIntoView()
                        .check()
                })
            })


    cy.get('.tags-section-container')
        .click() //this will hide dropdown if visible
        .find(' button.clear-tags-btn:visible')
        .click()
        .get('.tags-section-container .selected-tags.tag-list button.tag-button')
        .should('not.exist')
});

it('Selected tags should filter chapters', () => {

    getSeedChaptersTags()
        .then((tags) => {
            const tag = tags[0];

            getFilterButton()
                .click();

            getFilterDropdownMenu()
                .find('.tag-select-item label')
                .contains(tag.name, {matchCase: false})
                .find('input[type="checkbox"]')
                .scrollIntoView()
                .check()


            cy.get('a')
                .as('pageLinks');

            cy.get('.infinity-loader .records-loaded-indicator')
                .then((ind)=>{
                    if(ind.children('strong').length === 0){
                        fetchFirstPageChapters()
                            .then((chapters) => {
                                const filteredChapters = chapters.filter((chapter) => chapter.tags.some((tag)=>tag.id===tag.id));

                                for (const chapter of filteredChapters) {
                                    cy.get('@pageLinks')
                                        .filter(`[href="/chapter/${chapter.id}"]`)
                                        .should('be.visible')
                                }
                            })
                    }

                })

        })

});


})
