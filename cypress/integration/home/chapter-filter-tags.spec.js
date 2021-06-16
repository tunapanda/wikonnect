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
        let tags = {};
        return fetchFirstPageChapters().then((chapters) => {
            chapters.map(chapter => {
                chapter.tags.map(tag => {
                    tags[tag] = tag;
                });
            });
            return Object.values(tags)
        })
    }

    it('Should search existing tags', () => {

        getSeedChaptersTags()
            .then((tags) => {

                getFilterButton()
                    .click();

                getFilterDropdownMenu()
                    .find('input.search-input')
                    .type(tags[0]);

                getFilterDropdownMenu()
                    .find('.tag-select-item')
                    .find('label')
                    .contains(tags[0], {matchCase: false});
            });
    });

    it('Selected tags should be visible', () => {
        getSeedChaptersTags()
            .then((tags) => {

                getFilterButton()
                    .click();

                getFilterDropdownMenu()
                    .find('.tag-select-item label')
                    .contains(tags[0], {matchCase: false})
                    .find('input[type="checkbox"]')
                    .check();

                cy.get('.chapter-filters-section .selected-tags')
                    .find('button.tag-button')
                    .contains(tags[0], {matchCase: false});
            });
    });

    it('Clear all filters buttons should unselect all selected tags', () => {
        getFilterButton()
            .click();

        getFilterDropdownMenu()
            .find('.tag-select-item label')
            .find('input[type="checkbox"]')
            .each((el, index) => {
                cy.wrap(el)
                    .check();
                if(index===5){
                    return false;
                }
            });

        cy.get('.tags-section-container button.clear-tags-btn:visible')
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
                    .contains(tag, {matchCase: false})
                    .find('input[type="checkbox"]')
                    .check()


                cy.get('a')
                    .as('pageLinks');


                fetchFirstPageChapters()
                    .then((chapters) => {
                        const filteredChapters = chapters.filter((chapter) => chapter.tags.includes(tag));

                        for (const chapter of filteredChapters) {
                            cy.get('@pageLinks')
                                .filter(`[href="/chapter/${chapter.id}"]`)
                                .should('be.visible')
                        }
                    })
            })

    });


})
