import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

import RenderCondition from "@/components/common/RenderCondition";
import RowSteps from "@/components/common/RowSteps";

import Create from "./Create";

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

enum Step {
  CREATE = 0,
  REVIEW = 1,
  PUBLIC = 2,
}

const stepsList = () => [
  {
    title: "Create",
  },
  {
    title: "Review",
  },
  {
    title: "Public",
  },
];

export default function AddWorkSpace({ isOpen, onOpenChange }: IProps) {
  const [step, setStep] = React.useState<number>(0);
  const renderTitleButtonNext = step === Step.CREATE ? "Next" : "Create";
  const renderTitleButtonPrev = step === Step.CREATE ? "Close" : "Previous";

  const renderActionNext = () => {
    if (step === Step.CREATE) {
      setStep(Step.REVIEW);
    } else if (step === Step.REVIEW) {
      setStep(Step.PUBLIC);
    }
  };
  const renderActionPrev = (onClose: () => void) => {
    if (step === Step.CREATE) {
      onClose();
    } else if (step === Step.REVIEW) {
      setStep(Step.CREATE);
    }
  };

  return (
    <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a new workspace
            </ModalHeader>
            <ModalBody className="flex flex-col items-center gap-0 text-center">
              <p className="text-sm text-gray-500">
                Fill in your organization details and kickstart efficient
                collaboration on Lark.
              </p>
              <>
                <RowSteps
                  className="my-5"
                  defaultStep={step}
                  currentStep={step}
                  onStepChange={(newStep) => setStep(newStep)}
                  steps={stepsList()}
                />
                <>
                  <RenderCondition
                    keepAlive
                    condition={step === Step.CREATE}
                    ifContent={<Create />}
                  />
                  <RenderCondition
                    keepAlive
                    condition={step === Step.REVIEW}
                    ifContent={<Create />}
                  />
                  <RenderCondition
                    keepAlive
                    condition={step === Step.PUBLIC}
                    ifContent={<Create />}
                  />
                </>
              </>
            </ModalBody>
            <ModalFooter>
              <RenderCondition
                condition={step !== Step.PUBLIC}
                ifContent={
                  <>
                    <Button
                      color="danger"
                      onPress={() => renderActionPrev(onClose)}
                    >
                      {renderTitleButtonPrev}
                    </Button>
                    <Button color="primary" onPress={() => renderActionNext()}>
                      {renderTitleButtonNext}
                    </Button>
                  </>
                }
                elseContent={
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      setStep(Step.CREATE);
                    }}
                  >
                    Close
                  </Button>
                }
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
