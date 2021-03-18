import chapters from '../../fixtures/chapters.json';

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
        chapters.map(chapter => {
            chapter.tags.map(tag => {
                tags[tag] = tag;
            });
        });
        return Object.values(tags)
    }
    it('Selected tags should filter chapters', () => {
        const tag = getSeedChaptersTags()[1];

        const filteredChapters = chapters.filter((chapter) => chapter.tags.includes(tag));


        getFilterButton()
            .click();

        getFilterDropdownMenu()
            .find('.tag-select-item label')
            .contains(tag, { ignoreCase: true })
            .find('input[type="checkbox"]')
            .check();

    });

    it('Tags filter should exists', () => {
        getFilterButton()
            .should('be.visible')
            .click();

        getFilterDropdownMenu()
            .should('be.visible');

    });

    it('Should search existing tags', () => {

        const tags = getSeedChaptersTags();

        getFilterButton()
            .click();

        getFilterDropdownMenu()
            .find('input.search-input')
            .type(tags[0]);

        getFilterDropdownMenu()
            .find('.tag-select-item')
            .find('label')
            .contains(tags[0], { ignoreCase: true })
    });

    it('Selected tags should be visible', () => {
        const tags = getSeedChaptersTags();

        getFilterButton()
            .click();

        getFilterDropdownMenu()
            .find('.tag-select-item label')
            .contains(tags[0], { ignoreCase: true })
            .find('input[type="checkbox"]')
            .check();

        cy.get('.chapter-filters-section .selected-tags')
            .find('button.tag-button')
            .contains(tags[0], { ignoreCase: true });
    });


    it('Clear all filters buttons should unselect all tags', () => {
        getFilterButton()
            .click();

        getFilterDropdownMenu()
            .find('.tag-select-item label')
            .find('input[type="checkbox"]')
            .check();

        cy.get('.tags-section-container button.clear-tags-btn:visible')
            .click()
            .get('.tags-section-container .selected-tags.tag-list button.tag-button')
            .should('not.exist')
    });





})
