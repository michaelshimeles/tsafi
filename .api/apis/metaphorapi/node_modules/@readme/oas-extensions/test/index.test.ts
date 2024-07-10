/* eslint-disable mocha/no-setup-in-describe */
import petstore from '@readme/oas-examples/3.0/json/petstore.json';
import { expect } from 'chai';
import Oas from 'oas';

import * as extensions from '../src';

describe('oas-extensions', function () {
  [
    'CODE_SAMPLES',
    'EXPLORER_ENABLED',
    'HEADERS',
    'METRICS_ENABLED',
    'PROXY_ENABLED',
    'SAMPLES_ENABLED',
    'SAMPLES_LANGUAGES',
    'SEND_DEFAULTS',
    'SIMPLE_MODE',
  ].forEach(extension => {
    it(`\`${extension}\` extension should have a default value`, function () {
      expect(extensions.defaults).to.have.property(extensions[extension]);
    });
  });

  describe('#getExtension', function () {
    it("should not throw an exception if `Oas` doesn't have an API definition", function () {
      const oas = Oas.init(undefined);
      expect(extensions.getExtension(extensions.SAMPLES_LANGUAGES, oas)).to.have.length(7);
    });

    it("should not throw an exception if `Operation` doesn't have an API definition", function () {
      const oas = Oas.init(undefined);
      const operation = oas.operation('/pet', 'post');
      expect(extensions.getExtension(extensions.SAMPLES_LANGUAGES, oas, operation)).to.have.length(7);
    });

    describe('oas-level extensions', function () {
      it('should use the default extension value if the extension is not present', function () {
        const oas = Oas.init(petstore);
        expect(extensions.getExtension(extensions.SAMPLES_LANGUAGES, oas)).to.deep.equal([
          'shell',
          'node',
          'ruby',
          'php',
          'python',
          'java',
          'csharp',
        ]);
      });

      it('should locate an extensions under `x-readme`', function () {
        const oas = Oas.init({
          ...petstore,
          'x-readme': {
            [extensions.SAMPLES_LANGUAGES]: ['swift'],
          },
        });

        expect(extensions.getExtension(extensions.SAMPLES_LANGUAGES, oas)).to.deep.equal(['swift']);
      });

      it('should locate an extensions listed at the root', function () {
        const oas = Oas.init({ ...petstore, [`x-${extensions.EXPLORER_ENABLED}`]: false });
        expect(extensions.getExtension(extensions.EXPLORER_ENABLED, oas)).to.be.false;
      });

      it('should not throw if `x-readme` is not an object', function () {
        const oas = Oas.init({
          ...petstore,
          'x-readme': true,
        });

        expect(extensions.getExtension(extensions.SAMPLES_LANGUAGES, oas)).to.have.length(7);
      });

      it('should not pick up the `code-samples` extension', function () {
        const oas = Oas.init({
          ...petstore,
          'x-readme': {
            [extensions.CODE_SAMPLES]: [
              {
                name: 'Custom cURL snippet',
                language: 'curl',
                code: 'curl -X POST https://api.example.com/v2/alert',
              },
            ],
          },
        });

        expect(extensions.getExtension(extensions.CODE_SAMPLES, oas)).to.be.undefined;
      });
    });

    describe('operation-level', function () {
      let oas;

      beforeEach(function () {
        oas = Oas.init(petstore);
      });

      it('should use the default extension value if the extension is not present', function () {
        const operation = oas.operation('/pet', 'post');

        expect(extensions.getExtension(extensions.SAMPLES_LANGUAGES, oas, operation)).to.deep.equal([
          'shell',
          'node',
          'ruby',
          'php',
          'python',
          'java',
          'csharp',
        ]);
      });

      it('should locate an extensions under `x-readme`', function () {
        const operation = oas.operation('/pet', 'post');
        operation.schema['x-readme'] = {
          [extensions.SAMPLES_LANGUAGES]: ['swift'],
        };

        expect(extensions.getExtension(extensions.SAMPLES_LANGUAGES, oas, operation)).to.deep.equal(['swift']);
      });

      it('should locate an extensions listed at the root', function () {
        const operation = oas.operation('/pet', 'post');
        operation.schema[`x-${extensions.EXPLORER_ENABLED}`] = false;

        expect(extensions.getExtension(extensions.EXPLORER_ENABLED, oas, operation)).to.be.false;
      });

      it('should not throw if `x-readme` is not an object', function () {
        const operation = oas.operation('/pet', 'post');
        operation.schema['x-readme'] = true;

        expect(extensions.getExtension(extensions.SAMPLES_LANGUAGES, oas)).to.have.length(7);
      });
    });
  });

  describe('#isExtensionValid()', function () {
    it('should validate that `x-readme` is an object', function () {
      expect(() => {
        extensions.validateExtension(extensions.EXPLORER_ENABLED, Oas.init({ 'x-readme': [] }));
      }).to.throw(/must be of type "Object"/);

      expect(() => {
        extensions.validateExtension(extensions.EXPLORER_ENABLED, Oas.init({ 'x-readme': false }));
      }).to.throw(/must be of type "Object"/);

      expect(() => {
        extensions.validateExtension(extensions.EXPLORER_ENABLED, Oas.init({ 'x-readme': null }));
      }).to.throw(/must be of type "Object"/);
    });

    [
      [
        'CODE_SAMPLES',
        [
          {
            name: 'Custom cURL snippet',
            language: 'curl',
            code: 'curl -X POST https://api.example.com/v2/alert',
            install: 'brew install curl',
          },
        ],
        false,
        'Array',
      ],
      ['EXPLORER_ENABLED', true, 'false', 'Boolean'],
      ['HEADERS', [{ key: 'X-API-Key', value: 'abc123' }], false, 'Array'],
      ['PROXY_ENABLED', true, 'yes', 'Boolean'],
      ['METRICS_ENABLED', false, 'no', 'Boolean'],
      ['SAMPLES_ENABLED', true, 'no', 'Boolean'],
      ['SAMPLES_LANGUAGES', ['swift'], {}, 'Array'],
      ['SEND_DEFAULTS', true, 'absolutely not', 'Boolean'],
      ['SIMPLE_MODE', true, 'absolutely not', 'Boolean'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ].forEach(([extension, validValue, invalidValue, expectedType]: [string, any, any, string]) => {
      describe(`${extension}`, function () {
        describe('should allow valid extensions', function () {
          it('should allow at the root level', function () {
            expect(() => {
              extensions.validateExtension(
                extensions[extension],
                Oas.init({ [`x-${extensions[extension]}`]: validValue })
              );
            }).not.to.throw();
          });

          it('should allow if nested in `x-readme`', function () {
            expect(() => {
              extensions.validateExtension(
                extensions[extension],
                Oas.init({
                  'x-readme': {
                    [extensions[extension]]: validValue,
                  },
                })
              );
            }).not.to.throw();
          });
        });

        describe('should fail on invalid extension values', function () {
          it('should error if at the root level', function () {
            expect(() => {
              extensions.validateExtension(
                extensions[extension],
                Oas.init({ [`x-${extensions[extension]}`]: invalidValue })
              );
            }).to.throw(new RegExp(`"x-${extensions[extension]}" must be of type "${expectedType}"`));
          });

          it('should error if nested in `x-readme`', function () {
            expect(() => {
              extensions.validateExtension(
                extensions[extension],
                Oas.init({
                  'x-readme': {
                    [extensions[extension]]: invalidValue,
                  },
                })
              );
            }).to.throw(new RegExp(`"x-readme.${extensions[extension]}" must be of type "${expectedType}"`));
          });
        });
      });
    });
  });
});
