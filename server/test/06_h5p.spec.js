const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
chai.should();

const route = '/api/v1/h5p';

const editorModelSchema = {
  integration: {
    ajax: {},
    editor: {},
    url: '',
    user: {}
  },
  scripts: [],
  styles: [],
  urlGenerator: {
    config: {
      ajaxUrl: '',
      baseUrl: '',
      contentFilesUrl: '',
      coreUrl: '',
      librariesUrl: '',
      playUrl: '',
      uuid: '',
      contentWhitelist: ''
    }
  }
};


describe('H5P Route', () => {
  it('Should return editor model object', done => {
    chai
      .request(server)
      .get(`${route}/editor`)
      .end((err, res) => {

        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('model');

        Object.keys(editorModelSchema)
          .map((key) => {
            res.body.model.should.have.property(key);
          });

        Object.keys(editorModelSchema.integration)
          .map((key) => {
            res.body.model.integration.should.have.property(key);
          });

        res.body.model.urlGenerator.should.have.property('config');

        Object.keys(editorModelSchema.urlGenerator.config)
          .map((key) => {
            res.body.model.urlGenerator.config.should.have.property(key);
          });

        done();
      });

  });

  /**
   * Post AJAX
   */
  it('Should install editor library', () => {
    const queryParams = 'action=library-install&id=H5P.ImageSlider';
    return chai
      .request(server)
      .post(`${route}/ajax?${queryParams}`)
      .then((res) => {
        res.should.have.status(201);
        return true;
      }).catch(() => false);

  }).timeout(0);

  /**
   * Post AJAX
   */
  it('Should get libraries details', done => {
    const queryParams = 'action=libraries';
    chai
      .request(server)
      .post(`${route}/ajax?${queryParams}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({'libraries[]':'H5P.ImageSlide 1.1'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        if (res.body[0]) {
          res.body[0].should.have.property('majorVersion');
          res.body[0].should.have.property('minorVersion');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('uberName');
          res.body[0].should.have.property('title');
        }
        done();
      });
  });

  /**
   *  Get AJAX
   */
  it('Should get a library details', done => {
    const queryParams = 'action=libraries&machineName=H5P.ImageSlide&majorVersion=1&minorVersion=1';
    chai
      .request(server)
      .get(`${route}/ajax?${queryParams}`)
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('title');
        res.body.should.have.property('name');
        res.body.should.have.property('version');
        res.body.should.have.property('title');

        done();
      })
      .catch((error) => {

        error.should.have.status(400);
        error.response.body.should.have.property('error');
        done();

      })
    ;
  });

  it('Should create H5P content', () => {

    const H5PSampleQuestion = {
      library: 'H5P.TrueFalse 1.6',
      params: {
        params: {
          'media': {
            'type': {
              'params': {
                'contentName': 'Image'
              },
              'library': 'H5P.Image 1.1',
              'subContentId': 'ae8546b9-cdd5-41fd-a175-ce7a7cbf8345',
              'metadata': {
                'contentType': 'Image',
                'license': 'U',
                'title': 'Untitled Image',
                'authors': [],
                'changes': [],
                'extraTitle': 'Untitled Image'
              }
            },
            'disableImageZooming': false
          },
          'correct': 'false',
          'behaviour': {
            'enableRetry': true,
            'enableSolutionsButton': true,
            'enableCheckButton': true,
            'confirmCheckDialog': false,
            'confirmRetryDialog': false,
            'autoCheck': false
          },
          'l10n': {
            'trueText': 'True',
            'falseText': 'False',
            'score': 'You got @score of @total points',
            'checkAnswer': 'Check',
            'showSolutionButton': 'Show solution',
            'tryAgain': 'Retry',
            'wrongAnswerMessage': 'Wrong answer',
            'correctAnswerMessage': 'Correct answer',
            'scoreBarLabel': 'You got :num out of :total points',
            'a11yCheck': 'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
            'a11yShowSolution': 'Show the solution. The task will be marked with its correct solution.',
            'a11yRetry': 'Retry the task. Reset all responses and start the task over again.'
          },
          'confirmCheck': {
            'header': 'Finish ?',
            'body': 'Are you sure you wish to finish ?',
            'cancelLabel': 'Cancel',
            'confirmLabel': 'Finish'
          },
          'confirmRetry': {
            'header': 'Retry ?',
            'body': 'Are you sure you wish to retry ?',
            'cancelLabel': 'Cancel',
            'confirmLabel': 'Confirm'
          },
          'question': '<p>Answer one</p>\n'
        },
        metadata: {
          'defaultLanguage': 'en',
          'license': 'U',
          'authors': [],
          'changes': [],
          'extraTitle': 'Test question',
          'title': 'Test question'
        }
      }
    };
    return chai
      .request(server)
      .post(`${route}/content`)
      .set('content-type', 'application/json')
      .send(H5PSampleQuestion)
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('id');

        return true;
      }).catch((error => {
        error.should.have.status(400);
        return false;
      }));
  });


});
