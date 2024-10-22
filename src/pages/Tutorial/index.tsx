import { useState } from 'react';

import TutorialCard from '@/components/tutorial/TutorialCard';

import Overlay from './Overlay';
import CRUD from './dummy/CRUD';
import ExitUrl from './dummy/FlexNotDomainBox';
import ServerInputHttp from './dummy/ServerInputHttp';
import ServerInputHttps from './dummy/ServerInputHttps';
import TutorialLayout from './dummy/TutorialLayout';
import TutorialLayoutAddedDomain from './dummy/TutorialLayoutAddedDomain';

const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  if (currentStep === 0)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            styles='right-12 top-24'
          />
          <ExitUrl />
        </TutorialLayout>
      </>
    );
  if (currentStep === 1)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            styles='left-22 top-[45%]'
          />
          <ServerInputHttp />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 2)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            styles='left-22 top-[45%]'
          />
          <ServerInputHttps />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 3)
    return (
      <>
        <Overlay />

        <TutorialLayoutAddedDomain currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            styles='right-12 top-24'
          />
        </TutorialLayoutAddedDomain>
      </>
    );
  else if (currentStep === 4)
    return (
      <>
        <Overlay />
        <TutorialLayoutAddedDomain currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            styles='right-40 top-24'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayoutAddedDomain>
      </>
    );
  else if (currentStep === 5)
    return (
      <>
        <Overlay />

        <TutorialLayoutAddedDomain currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            styles='left-[42%] top-14'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayoutAddedDomain>
      </>
    );
  else if (currentStep === 6)
    return (
      <>
        <Overlay />

        <TutorialLayoutAddedDomain currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            styles='right-10 top-24'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayoutAddedDomain>
      </>
    );
  return (
    <>
      <Overlay />

      <TutorialLayoutAddedDomain currentStep={currentStep}>
        <TutorialCard
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          styles='left-20 bottom-24'
        />
        <CRUD currentStep={currentStep} />
      </TutorialLayoutAddedDomain>
    </>
  );
};

export default TutorialPage;
