import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { DrawingStorageService } from './drawing-storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DrawingStorageService', () => {
  let storageSpy, storageSet, storageGet, storageRemove;
  const mockStorageData = [
    {
      imageData: '',
      drawTask: 'test1',
      saveDate: Date.now(),
      thumbnail: '',
      correctGuess: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    storageGet = Promise.resolve(JSON.stringify(mockStorageData));
    storageSet = () => {
      mockStorageData.push({
        imageData: '',
        drawTask: 'test2',
        saveDate: Date.now(),
        thumbnail: '',
        correctGuess: true,
      });
    };
    storageRemove = Promise.resolve();
    storageSpy = jasmine.createSpyObj('Storage', {
      set: storageSet,
      get: storageGet,
      remove: storageRemove,
    });
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Storage, useValue: storageSpy }],
    }).compileComponents();
  });

  it('should be created', () => {
    const service: DrawingStorageService = TestBed.get(DrawingStorageService);
    expect(service).toBeTruthy();
  });

  it('should save drawings in Storage', () => {
    const service: DrawingStorageService = TestBed.get(DrawingStorageService);
    service.saveDrawing({
      imageData: '',
      drawTask: 'test2',
      saveDate: Date.now(),
      thumbnail: '',
      correctGuess: true,
    });
    expect(storageSpy.get).toHaveBeenCalled();
    expect(storageSpy.set).toHaveBeenCalled();
  });

  it('should load all drawings in Storage', () => {
    // const service: DrawingStorageService = TestBed.get(DrawingStorageService);
    // service.loadDrawings();
  });

  it('should load a specific drawing based on index in Storage', () => {
    // const service: DrawingStorageService = TestBed.get(DrawingStorageService);
    // service.loadDrawing(0);
  });

  it('should delete a specific drawing based on index in Storage', () => {
    // const service: DrawingStorageService = TestBed.get(DrawingStorageService);
    // service.loadDrawing(0);
  });
});
